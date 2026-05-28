'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraTryOnProps {
  productImage: string;
  productName: string;
}

export function CameraTryOn({ productImage, productName }: CameraTryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');
  const [frameScale, setFrameScale] = useState(1);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setError('');
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw glasses overlay (simulated - in production would use MediaPipe/TensorFlow.js)
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Draw glasses at center-top of face (approximate position)
          ctx.drawImage(
            img,
            canvasRef.current!.width / 2 - 80,
            canvasRef.current!.height / 2 - 40,
            160 * frameScale,
            80 * frameScale
          );
        };
        img.src = productImage;

        // Download canvas as image
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = `${productName}-tryon.png`;
        link.click();
      }
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
        <h3 className="text-xl font-semibold text-white mb-4">Basic Camera Try-On</h3>
        <p className="text-slate-400 text-sm mb-4">
          Tip: Use the AR Virtual Try-On for more accurate frame positioning with facial detection
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-96 object-cover"
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Frame Size</label>
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

          <div className="flex gap-2">
            {!cameraActive ? (
              <Button
                onClick={startCamera}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Start Camera
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
