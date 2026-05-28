'use client';

import { useState } from 'react';
import { Ruler, Check } from 'lucide-react';

interface FrameSizeGuideProps {
  onSizeSelect?: (size: string) => void;
  selectedSize?: string;
}

export function FrameSizeGuide({ onSizeSelect, selectedSize }: FrameSizeGuideProps) {
  const [expanded, setExpanded] = useState(true);

  const sizes = [
    {
      size: 'Small (XS)',
      range: '50-52mm',
      description: 'Best for narrow face shapes',
      recommendation: 'Heart, oval, oblong faces',
    },
    {
      size: 'Medium (S-M)',
      range: '53-55mm',
      description: 'Universal fit for most',
      recommendation: 'Ideal for most face shapes',
    },
    {
      size: 'Large (L-XL)',
      range: '56-58mm',
      description: 'Best for wider face shapes',
      recommendation: 'Round, square, oblong faces',
    },
    {
      size: 'Extra Large (XXL)',
      range: '59-62mm',
      description: 'For larger faces',
      recommendation: 'Very wide or large faces',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Ruler className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Frame Size Guide</h3>
          {selectedSize && (
            <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
              Selected: {selectedSize}
            </span>
          )}
        </div>
        <span className="text-sm text-blue-600 font-medium">
          {expanded ? 'Hide ▲' : 'Show ▼'}
        </span>
      </button>

      {expanded && (
        <>
          <p className="text-sm text-gray-600 mt-3 mb-4">
            Click a size to select it for your order:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sizes.map((item, idx) => {
              const isSelected = selectedSize === item.size;
              return (
                <div
                  key={idx}
                  onClick={() => onSizeSelect?.(item.size)}
                  className={`p-4 bg-white rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                      <h4 className="font-bold text-gray-900">{item.size}</h4>
                    </div>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      isSelected
                        ? 'text-white bg-blue-600'
                        : 'text-blue-600 bg-blue-100'
                    }`}>
                      {item.range}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold">Best for:</span> {item.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
        <p className="text-sm text-blue-900">
          💡 <span className="font-semibold">Pro Tip:</span> Most eyewear uses 48-56mm frames. Check your current glasses for the size code on the inside of the frame.
        </p>
      </div>
    </div>
  );
}