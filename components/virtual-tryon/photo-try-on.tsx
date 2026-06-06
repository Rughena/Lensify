'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PhotoTryOnProps {
  productImage: string;
  productName: string;
}

export function PhotoTryOn({ productImage, productName }: PhotoTryOnProps) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [frameScale, setFrameScale] = useState(1);
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (selectedImage && canvasRef.current) {
      drawPreview();
    }
  }, [selectedImage, frameScale, framePosition]);

  const drawPreview = () => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw uploaded image
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

      // Draw frames overlay
      const framesImg = new Image();
      framesImg.crossOrigin = 'anonymous';
      framesImg.onload = () => {
        ctx.drawImage(
          framesImg,
          framePosition.x,
          framePosition.y,
          160 * frameScale,
          80 * frameScale
        );
      };
      framesImg.src = productImage;
    };
    img.src = selectedImage;
  };

  const downloadResult = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL('image/png');
      link.download = `${productName}-tryon.png`;
      link.click();
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Photo Try-On</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-2">
            Upload a Photo
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full border-slate-600 text-slate-300"
          >
            Choose Photo
          </Button>
        </div>

        {selectedImage && (
          <>
            <div className="relative bg-black rounded-lg overflow-hidden h-96">
              <canvas
                ref={canvasRef}
                width={640}
                height={480}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Frame Size: {frameScale.toFixed(1)}x
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Position X: {framePosition.x}
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="300"
                    step="10"
                    value={framePosition.x}
                    onChange={(e) =>
                      setFramePosition({ ...framePosition, x: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Position Y: {framePosition.y}
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="300"
                    step="10"
                    value={framePosition.y}
                    onChange={(e) =>
                      setFramePosition({ ...framePosition, y: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <Button
                onClick={downloadResult}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Download Result
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}