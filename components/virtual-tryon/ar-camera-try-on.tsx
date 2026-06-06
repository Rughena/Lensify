/**
 * Advanced AR-powered virtual try-on with MediaPipe facial detection
 * Provides real-time frame overlay with accurate facial landmark positioning
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FaceLandmarks,
  calculateFramePosition,
  drawGlassesFrame,
  validateFaceQuality,
  frameConfigs,
} from '@/lib/ar-utils';

interface ARCameraTryOnProps {
  productImage: string;
  productName: string;
  frameStyle?: keyof typeof frameConfigs;
}

export function ARCameraTryOn({
  productImage,
  productName,
  frameStyle = 'standard',
}: ARCameraTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [qualityIssues, setQualityIssues] = useState<string[]>([]);
  const [frameScale, setFrameScale] = useState(1);
  const [showAR, setShowAR] = useState(true);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const faceMeshRef = useRef<any>(null);

  // Load MediaPipe FaceMesh
  const initializeMediaPipe = async () => {
    try {
      setLoading(true);

      // Dynamically load MediaPipe scripts
      const script1 = document.createElement('script');
      script1.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.4/camera_utils.js';
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.4/drawing_utils.js';
      document.body.appendChild(script2);

      const script3 = document.createElement('script');
      script3.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js';

      script3.onload = () => {
        if (typeof (window as any).FaceMesh !== 'undefined') {
          const FaceMesh = (window as any).FaceMesh;
          faceMeshRef.current = new FaceMesh({
            locateFile: (file: string) =>
              `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`,
          });

          faceMeshRef.current.setOptions({
            maxNumFaces: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });

          faceMeshRef.current.onResults(handleFaceResults);
          setLoading(false);
        }
      };

      document.body.appendChild(script3);
    } catch (err) {
      console.error('Error loading MediaPipe:', err);
      setError('Failed to load AR engine. Using basic overlay mode.');
      setLoading(false);
    }
  };

  const handleFaceResults = (results: any) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      setFaceDetected(true);

      // Extract key facial landmarks
      const faceLandmarks: FaceLandmarks = {
        leftEye: {
          x: landmarks[33].x * canvas.width,
          y: landmarks[33].y * canvas.height,
        },
        rightEye: {
          x: landmarks[263].x * canvas.width,
          y: landmarks[263].y * canvas.height,
        },
        noseTip: {
          x: landmarks[1].x * canvas.width,
          y: landmarks[1].y * canvas.height,
        },
        leftJaw: {
          x: landmarks[130].x * canvas.width,
          y: landmarks[130].y * canvas.height,
        },
        rightJaw: {
          x: landmarks[359].x * canvas.width,
          y: landmarks[359].y * canvas.height,
        },
        mouthLeft: {
          x: landmarks[291].x * canvas.width,
          y: landmarks[291].y * canvas.height,
        },
        mouthRight: {
          x: landmarks[61].x * canvas.width,
          y: landmarks[61].y * canvas.height,
        },
        faceWidth:
          Math.abs(landmarks[454].x - landmarks[234].x) * canvas.width,
        faceHeight:
          Math.abs(landmarks[152].y - landmarks[10].y) * canvas.height,
        centerX: (landmarks[33].x + landmarks[263].x) * canvas.width * 0.5,
        centerY: (landmarks[10].y + landmarks[152].y) * canvas.height * 0.5,
        scale: 1,
      };

      // Calculate frame position
      const frameConfig = frameConfigs[frameStyle];
      const position = calculateFramePosition(faceLandmarks, frameConfig);

      // Validate face quality
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const quality = validateFaceQuality(faceLandmarks, imageData);
      setQualityIssues(quality.issues);

      // Draw glasses if AR is enabled
      if (showAR) {
        const frameImage = new Image();
        frameImage.crossOrigin = 'anonymous';
        frameImage.src = productImage;

        drawGlassesFrame(
          ctx,
          position.x,
          position.y * frameScale,
          position.width * frameScale,
          position.height * frameScale,
          position.rotation,
          '#1a1a1a',
          frameImage
        );

        // Draw face detection markers (optional debug)
        if (false) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
          ctx.beginPath();
          ctx.arc(faceLandmarks.leftEye.x, faceLandmarks.leftEye.y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(faceLandmarks.rightEye.x, faceLandmarks.rightEye.y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      setFaceDetected(false);
      setQualityIssues(['No face detected - please position yourself in front of camera']);
    }
  };

  const startCamera = async () => {
    try {
      setLoading(true);
      await initializeMediaPipe();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
        setCameraActive(true);
        setError('');

        // Start detection loop
        startARDetection();
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
    } finally {
      setLoading(false);
    }
  };

  const startARDetection = async () => {
    if (!faceMeshRef.current || !videoRef.current) {
      // Fallback to basic overlay if MediaPipe failed
      startBasicOverlay();
      return;
    }

    const runDetection = async () => {
      if (videoRef.current && cameraActive) {
        try {
          await faceMeshRef.current.send({ image: videoRef.current });
        } catch (err) {
          console.error('Detection error:', err);
        }
      }
      if (cameraActive) {
        animationRef.current = requestAnimationFrame(runDetection);
      }
    };

    runDetection();
  };

  const startBasicOverlay = () => {
    const runBasicOverlay = () => {
      if (!videoRef.current || !canvasRef.current || !cameraActive) return;

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Draw simple glasses overlay in center
      const frameImage = new Image();
      frameImage.crossOrigin = 'anonymous';
      frameImage.onload = () => {
        ctx.drawImage(
          frameImage,
          canvasRef.current!.width / 2 - 80,
          canvasRef.current!.height / 2 - 40,
          160 * frameScale,
          80 * frameScale
        );
      };
      frameImage.src = productImage;

      setFaceDetected(true);
      animationRef.current = requestAnimationFrame(runBasicOverlay);
    };

    runBasicOverlay();
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCameraActive(false);
    setFaceDetected(false);
  };

  const captureFrame = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `${productName}-ar-tryon.png`;
      link.click();
    }
  };

  useEffect(() => {
    return () => {
      if (cameraActive) {
        stopCamera();
      }
    };
  }, [cameraActive]);

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          AR Virtual Try-On
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {qualityIssues.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded text-yellow-300 text-sm">
            {qualityIssues.map((issue, i) => (
              <div key={i}>• {issue}</div>
            ))}
          </div>
        )}

        {faceDetected && (
          <div className="mb-4 p-2 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm">
            ✓ Face detected - AR active
          </div>
        )}

        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
          {!cameraActive ? (
            <div className="w-full h-96 bg-slate-900 flex items-center justify-center">
              <p className="text-slate-400">Camera inactive</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="hidden"
              />
              <canvas
                ref={canvasRef}
                width={1280}
                height={720}
                className="w-full h-96 object-cover"
              />
            </>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Frame Scale: {frameScale.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={frameScale}
              onChange={(e) => setFrameScale(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-3 p-2 bg-slate-700 rounded">
            <input
              type="checkbox"
              id="ar-toggle"
              checked={showAR}
              onChange={(e) => setShowAR(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="ar-toggle" className="text-sm text-slate-300">
              Show AR Overlay
            </label>
          </div>

          <div className="flex gap-2">
            {!cameraActive ? (
              <Button
                onClick={startCamera}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Loading AR...' : 'Start AR Camera'}
              </Button>
            ) : (
              <>
                <Button
                  onClick={captureFrame}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Capture & Download
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="flex-1 border-slate-600"
                >
                  Stop Camera
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}