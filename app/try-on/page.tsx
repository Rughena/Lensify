'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';

export default function TryOnPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedFrames, setSelectedFrames] = useState<string>('/assets/frames/aviators.svg');
  const frameImageRef = useRef<HTMLImageElement | null>(null);

  const frameModels = [
    { id: 'aviators', name: 'Black Aviators', color: '#000000', price: 189.99, overlay: '/assets/frames/aviators.svg', thumb: '/assets/frames/aviators.svg' },
    { id: 'blue-oight-oval', name: 'Blue Light Oval', color: '#000000', price: 6800.99, overlay: '/assets/frames/blue-oight-oval.svg', thumb: '/assets/frames/blue-oight-oval.svg' },
    { id: 'minimalist-square', name: 'Lensify Minimalist Square', color: '#d1a961', price: 6750.99, overlay: '/assets/frames/minimalist-square.svg', thumb: '/assets/frames/minimalist-square.svg' },
    { id: 'sage-green', name: 'Sage Green', color: '#12827a', price: 5460.99, overlay: '/assets/frames/sage-green.svg', thumb: '/assets/frames/sage-green.svg' },
    { id: 'lensify-classic-black', name: 'Lensify Classic Black', color: '#000000', price: 4400.99, overlay: '/assets/frames/lensify-classic-black.svg', thumb: '/assets/frames/lensify-classic-black.svg' }, // <-- Added missing comma here
    { id: 'havana-square', name: 'Havana Square', color: '#dfba6b', price: 7280.99, overlay: '/assets/frames/havana-square.svg', thumb: '/assets/frames/havana-square.svg' },
    { id: 'clear-round', name: 'Clear Round', color: '#E6E6E6', price: 4100.99, overlay: '/assets/frames/clear-round.svg', thumb: '/assets/frames/clear-round.svg' },
    { id: 'round-mirrored', name: 'Round Mirrored', color: '#54e2ec', price: 6750.99, overlay: '/assets/frames/round-mirrored.svg', thumb: '/assets/frames/round-mirrored.svg' },
    { id: 'rose-gold-rectangle', name: 'Rose Gold Rectangle', color: '#e8b19d', price: 10580.99, overlay: '/assets/frames/rose-gold-rectangle.svg', thumb: '/assets/frames/rose-gold-rectangle.svg' },
    { id: 'tortoise-rectangle', name: 'Tortoise Rectangle', color: '#e05316', price: 5950.99, overlay: '/assets/frames/tortoise-rectangle.svg', thumb: '/assets/frames/tortoise-rectangle.svg' },
    { id: 'clubmaster-tortoise', name: 'Clubmaster Tortoise', color: '#5c3a21', price: 7200.99, overlay: '/assets/frames/clubmaster-tortoise.svg', thumb: '/assets/frames/clubmaster-tortoise.svg' },
    { id: 'navy-hexagon', name: 'Navy Hexagon', color: '#1b2a4a', price: 5200.99, overlay: '/assets/frames/navy-hexagon.svg', thumb: '/assets/frames/navy-hexagon.svg' },
    { id: 'round-gold', name: 'Round Gold', color: '#e0a928', price: 9240.99, overlay: '/assets/frames/round-gold.svg', thumb: '/assets/frames/round-gold.svg' },
    { id: 'havana-oval', name: 'Havana Oval', color: '#b54f16', price: 6300.99, overlay: '/assets/frames/havana-oval.svg', thumb: '/assets/frames/havana-oval.svg' },
    { id: 'cat-eye-pink', name: 'Cat Eye Pink', color: '#ff6ec7', price: 6000.99, overlay: '/assets/frames/cat-eye-pink.svg', thumb: '/assets/frames/cat-eye-pink.svg' },
    { id: 'cat-eye-black', name: 'Cat Eye Black', color: '#141416', price: 5100.00, overlay: '/assets/frames/cat-eye-black.svg', thumb: '/assets/frames/cat-eye-black.svg' },
    { id: 'hexagon-brown', name: 'Hexagon Brown', color: '#6b1d2f', price: 4290.99, overlay: '/assets/frames/hexagon-brown.svg', thumb: '/assets/frames/hexagon-brown.svg' },
    { id: 'sports-rectangle', name: 'Sports Rectangle', color: '#ff1a1a', price: 7225.00, overlay: '/assets/frames/sports-rectangle.svg', thumb: '/assets/frames/sports-rectangle.svg' },
    { id: 'wayfarer-black', name: 'Wayfarer Black', color: '#151618', price: 71225.00, overlay: '/assets/frames/wayfarer-black.svg', thumb: '/assets/frames/wayfarer-black.svg' },
    { id: 'square-purple', name: 'Square Purple', color: '#a468cf', price: 7650.00, overlay: '/assets/frames/square-purple.svg', thumb: '/assets/frames/square-purple.svg' },
    { id: 'round-gunmetal', name: 'Round Gunmetal', color: '#d0d7de', price: 10120.00, overlay: '/assets/frames/round-gunmetal.svg', thumb: '/assets/frames/round-gunmetal.svg' },
    { id: 'executive-silver', name: 'Executive Silver', color: '#cbd5e1', price: 9500.00, overlay: '/assets/frames/executive-silver.svg', thumb: '/assets/frames/executive-silver.svg' },
    { id: 'aviator-classic', name: 'Aviator Classic', color: '#e2ba6e', price: 11250.00, overlay: '/assets/frames/aviator-classic.svg', thumb: '/assets/frames/aviator-classic.svg' },
    { id: 'oval-havana', name: 'Oval Havana', color: '#ffffff', price: 165.00, overlay: '/assets/frames/oval-white.svg', thumb: '/assets/frames/oval-white.svg' },
    { id: 'round', name: 'Gold Round', color: '#FFD700', price: 199.99, overlay: '/assets/frames/round.svg', thumb: '/assets/frames/round.svg' },
    { id: 'cat-eye', name: 'Cat Eye', color: '#8B4513', price: 179.99, overlay: '/assets/frames/cat-eye.svg', thumb: '/assets/frames/cat-eye.svg' },
    { id: 'square', name: 'Square', color: '#A9927D', price: 159.99, overlay: '/assets/frames/square.svg', thumb: '/assets/frames/square.svg' },
    { id: 'clear', name: 'Clear Frames', color: '#E6E6E6', price: 129.99, overlay: '/assets/frames/clear.svg', thumb: '/assets/frames/clear.svg' },
    { id: 'tortoise', name: 'Tortoise Shell', color: '#7A4A2D', price: 209.99, overlay: '/assets/frames/tortoise.svg', thumb: '/assets/frames/tortoise.svg' },
  ];
  useEffect(() => {
  const img = new Image();
  img.src = selectedFrames;
  img.onload = () => {
    frameImageRef.current = img;
  };
}, [selectedFrames]);
  useEffect(() => {
    const startCameraAndFaceMesh = async () => {
      try {
        // start media stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        // Dynamically load MediaPipe FaceMesh and Camera utils from CDN if available
        if (!(window as any).FaceMesh || !(window as any).Camera) {
          await Promise.all([
            new Promise<void>((resolve, reject) => {
              const s = document.createElement('script');
              s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js';
              s.onload = () => resolve();
              s.onerror = () => reject(new Error('Failed to load face_mesh'));
              document.head.appendChild(s);
            }),
            new Promise<void>((resolve, reject) => {
              const s = document.createElement('script');
              s.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
              s.onload = () => resolve();
              s.onerror = () => reject(new Error('Failed to load camera_utils'));
              document.head.appendChild(s);
            }),
          ]).catch((err) => {
            console.warn('Could not load MediaPipe from CDN, falling back to simple overlay:', err);
            return;
          });
        }

        // If FaceMesh is available, set up detector and camera integration
        if ((window as any).FaceMesh && (window as any).Camera && videoRef.current) {
          const FaceMesh: any = (window as any).FaceMesh;
          const Camera: any = (window as any).Camera;

          const faceMesh = new FaceMesh({ locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}` });
          faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });

          // onResults will draw overlays using landmarks
          faceMesh.onResults((results: any) => {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            if (!canvas || !video) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // draw mirrored video
            canvas.width = video.videoWidth || canvas.width || 640;
            canvas.height = video.videoHeight || canvas.height || 480;
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
            ctx.restore();

            // draw frame overlay if landmarks exist
            const faceLandmarks = results.multiFaceLandmarks && results.multiFaceLandmarks[0];
            if (faceLandmarks && selectedFrames) {
              // compute positions using a few landmark indices
              // approximate eye centers using landmarks 33 (left), 263 (right)
              const left = faceLandmarks[33];
              const right = faceLandmarks[263];

              const lx = (1 - left.x) * canvas.width; // mirrored
              const ly = left.y * canvas.height;
              const rx = (1 - right.x) * canvas.width;
              const ry = right.y * canvas.height;

              // center and scale overlay
              const centerX = (lx + rx) / 2;
              const centerY = (ly + ry) / 2;
              const eyeDist = Math.hypot(rx - lx, ry - ly);
              const overlayWidth = eyeDist * 2.6;
              const overlayHeight = overlayWidth * 0.45;

              // if selectedFrames is an overlay path, draw the image
              if (frameImageRef.current) {
                ctx.save();
                ctx.translate(centerX, centerY - overlayHeight * 0.12);
                ctx.drawImage(frameImageRef.current, -overlayWidth / 2, -overlayHeight / 2, overlayWidth, overlayHeight);
                ctx.restore();
}
              } else {
                // fallback: colored ellipse overlay
                ctx.strokeStyle = selectedFrames;
                ctx.lineWidth = Math.max(2, Math.round(canvas.width / 200));
                ctx.fillStyle = selectedFrames + '33';
                ctx.beginPath();
                ctx.ellipse(centerX - overlayWidth * 0.18, centerY, overlayWidth * 0.45, overlayHeight / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(centerX + overlayWidth * 0.18, centerY, overlayWidth * 0.45, overlayHeight / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(centerX - overlayWidth * 0.05, centerY);
                ctx.lineTo(centerX + overlayWidth * 0.05, centerY);
                ctx.stroke();
              }
            }
          });

          // Camera integration provided by MediaPipe
          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              await faceMesh.send({ image: videoRef.current });
            },
            width: 1280,
            height: 720,
          });
          camera.start();

          // store camera so we can stop it later
          (window as any).__mp_camera = camera;
          (window as any).__mp_faceMesh = faceMesh;
        }
      } catch (error) {
        console.error('Error accessing camera or face detection:', error);
        alert('Please enable camera access to use AR try-on');
        setCameraActive(false);
      }
    };

    if (cameraActive) startCameraAndFaceMesh();

    // Cleanup when cameraActive toggles off
    return () => {
      if (!cameraActive) {
        try {
          if ((window as any).__mp_camera) {
            (window as any).__mp_camera.stop();
            (window as any).__mp_camera = null;
          }
        } catch (e) {
          // ignore
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
      }
    };
  }, [cameraActive, selectedFrames]);

  return (
    <>
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-purple-600 border-b border-purple-500 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-white">
            Lensify
          </Link>
          <Link href="/shop" className="text-white hover:text-purple-100 font-medium transition-colors duration-200">
            Shop
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">AR Try-On</h1>
        <p className="text-sm text-gray-600 mb-12">See how glasses look on you with augmented reality</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas/Video Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 overflow-hidden border border-gray-200">
              {cameraActive ? (
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="w-full block"
                  />
                  <video
                    ref={videoRef}
                    className="hidden"
                    autoPlay
                    playsInline
                    muted
                  />
                </div>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">Click "Start AR Try-On" to begin</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 text-base rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {cameraActive ? 'Stop AR Try-On' : 'Start AR Try-On'}
              </button>
            </div>
          </div>

          {/* Frames Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Choose Frames</h3>
            <div className="space-y-3">
              {frameModels.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrames(frame.overlay || frame.color)}
                  className={`w-full p-3 border transition-all duration-300 text-left text-sm flex items-center gap-3 ${
                    selectedFrames === frame.overlay || selectedFrames === frame.color
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-10 flex items-center justify-center">
                    <img src={frame.thumb} alt={frame.name} className="w-full h-auto" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{frame.name}</p>
                    <p className="text-sm text-gray-600">${frame.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>

            <Link href="/shop" className="block mt-8" onClick={() => localStorage.setItem('prefSelectedFrame', selectedFrames)}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-sm">
                View All Frames
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 border border-gray-200 p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">Precise Fit</h4>
            <p className="text-gray-600">See exactly how frames align with your face</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">Real-Time</h4>
            <p className="text-gray-600">Instant preview using your device camera</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-8">
            <div className="text-4xl mb-4">✨</div>
            <h4 className="text-lg font-bold mb-2 text-gray-900">Shop with Confidence</h4>
            <p className="text-gray-600">Make better decisions before you buy</p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}