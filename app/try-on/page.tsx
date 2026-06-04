'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

// Sirf yeh 3 frames VTO mein show hongi
const frameModels = [
  {
    id: 'black-rectangle',
    name: 'Lensify Classic Black Rectangle',
    overlay: '/products/Lensify_Classic_Black_Rectangle.png',
    thumb: '/products/Lensify_Classic_Black_Rectangle.png',
    price: 5000,
    discount: 12,
  },
  {
    id: 'sage-green-round',
    name: 'Lensify Sage Green Round',
    overlay: '/products/Lensify_Sage_Green_Round.png',
    thumb: '/products/Lensify_Sage_Green_Round.png',
    price: 6500,
    discount: 16,
  },
  {
    id: 'minimalist-square',
    name: 'Lensify Minimalist Square',
    overlay: '/products/Lensify_Minimalist_Square.png',
    thumb: '/products/Lensify_Minimalist_Square.png',
    price: 7500,
    discount: 10,
  },
];

export default function TryOnPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(frameModels[0]);
  const [faceDetected, setFaceDetected] = useState(false);
  const [frameScale, setFrameScale] = useState(1.0);

  useEffect(() => {
    if (!cameraActive) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        await loadMediaPipe();
      } catch (error) {
        console.error('Camera error:', error);
        alert('Please enable camera access to use AR try-on');
        setCameraActive(false);
      }
    };

    startCamera();

    return () => {
      try {
        if ((window as any).__mp_camera) {
          (window as any).__mp_camera.stop();
          (window as any).__mp_camera = null;
        }
      } catch (e) {}
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setFaceDetected(false);
    };
  }, [cameraActive]);

  useEffect(() => {
    if (cameraActive) setupFaceMesh();
  }, [selectedFrame, frameScale]);

  const loadMediaPipe = async () => {
    if ((window as any).FaceMesh && (window as any).Camera) {
      setupFaceMesh();
      return;
    }

    await Promise.all([
      new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
        s.onload = () => resolve();
        s.onerror = () => reject();
        document.head.appendChild(s);
      }),
      new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
        s.onload = () => resolve();
        s.onerror = () => reject();
        document.head.appendChild(s);
      }),
    ]).catch(() => console.warn('MediaPipe load failed'));

    setupFaceMesh();
  };

  const setupFaceMesh = () => {
    if (!(window as any).FaceMesh || !(window as any).Camera || !videoRef.current) return;

    try {
      if ((window as any).__mp_camera) {
        (window as any).__mp_camera.stop();
      }
    } catch (e) {}

    const FaceMesh = (window as any).FaceMesh;
    const Camera = (window as any).Camera;

    const faceMesh = new FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results: any) => {
      drawOverlay(results);
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 1280,
      height: 720,
    });

    camera.start();
    (window as any).__mp_camera = camera;
  };

  const drawOverlay = (results: any) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Mirrored video draw
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    const landmarks = results.multiFaceLandmarks?.[0];
    if (!landmarks) {
      setFaceDetected(false);
      return;
    }

    setFaceDetected(true);

    // Eye landmarks (mirrored)
    const left = landmarks[33];
    const right = landmarks[263];

    const lx = (1 - left.x) * canvas.width;
    const ly = left.y * canvas.height;
    const rx = (1 - right.x) * canvas.width;
    const ry = right.y * canvas.height;

    const centerX = (lx + rx) / 2;
    const centerY = (ly + ry) / 2;
    const eyeDist = Math.hypot(rx - lx, ry - ly);

    const overlayWidth = eyeDist * 2.6 * frameScale;
    const overlayHeight = overlayWidth * 0.45;

    const img = new Image();
    img.src = selectedFrame.overlay;
    img.onload = () => {
      ctx.save();
      ctx.translate(centerX, centerY - overlayHeight * 0.12);
      ctx.drawImage(
        img,
        -overlayWidth / 2,
        -overlayHeight / 2,
        overlayWidth,
        overlayHeight
      );
      ctx.restore();
    };
  };

  const capturePhoto = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = `lensify-tryon-${selectedFrame.name}.png`;
    link.click();
  };

  const finalPrice = selectedFrame.price - (selectedFrame.price * selectedFrame.discount) / 100;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Virtual Try-On</h1>
            <p className="text-blue-100">See how glasses look on you in real time</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Camera Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">

                {/* Camera View */}
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  {cameraActive ? (
                    <>
                      <canvas ref={canvasRef} className="w-full h-full object-cover" />
                      <video ref={videoRef} className="hidden" autoPlay playsInline muted />
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                        faceDetected ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                      }`}>
                        {faceDetected ? '✓ Face Detected' : '⚠ Searching for face...'}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-white p-8">
                      <div className="text-6xl mb-4">👓</div>
                      <p className="text-lg font-medium">Start camera to try on glasses</p>
                      <p className="text-sm text-gray-400 mt-1">Make sure your face is well lit</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Frame Size: {frameScale.toFixed(1)}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={frameScale}
                      onChange={(e) => setFrameScale(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setCameraActive(!cameraActive)}
                      className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                        cameraActive
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {cameraActive ? '⏹ Stop Camera' : '▶ Start Try-On'}
                    </button>
                    {cameraActive && (
                      <button
                        onClick={capturePhoto}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-all"
                      >
                        📸 Take Photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Frame Info */}
              <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedFrame.thumb}
                    alt={selectedFrame.name}
                    className="w-16 h-12 object-contain rounded-lg border border-gray-100 bg-gray-50"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{selectedFrame.name}</p>
                    <p className="text-xs text-green-600 font-semibold">✨ HD Transparent Overlay</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">Rs {finalPrice.toFixed(0)}</p>
                  <p className="text-xs text-gray-400 line-through">Rs {selectedFrame.price}</p>
                  <Link href="/shop">
                    <button className="mt-1 text-xs px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Frames Sidebar — sirf 3 frames */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Frames</h3>
              <p className="text-xs text-gray-500 mb-4">3 frames available for AR try-on</p>

              <div className="space-y-3">
                {frameModels.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => setSelectedFrame(frame)}
                    className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-all ${
                      selectedFrame.id === frame.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <img
                      src={frame.thumb}
                      alt={frame.name}
                      className="w-16 h-12 object-contain rounded-lg flex-shrink-0 bg-gray-50 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{frame.name}</p>
                      <p className="text-xs text-green-600 font-medium">✨ HD Overlay</p>
                      <p className="text-xs font-bold text-blue-600">
                        Rs {(frame.price - (frame.price * frame.discount) / 100).toFixed(0)}
                      </p>
                    </div>
                    {selectedFrame.id === frame.id && (
                      <span className="text-blue-600 text-xl">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <Link href="/shop" className="block mt-6">
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all">
                  Shop All Frames
                </button>
              </Link>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Precise Fit', desc: 'See exactly how frames align with your face' },
              { icon: '⚡', title: 'Real-Time AR', desc: 'MediaPipe face detection technology' },
              { icon: '📸', title: 'Take a Photo', desc: 'Save and share your try-on look' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}