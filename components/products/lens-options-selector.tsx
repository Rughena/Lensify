'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export function LensOptionsSelector() {
  const [selectedLens, setSelectedLens] = useState('single-vision');

  const lensTypes = [
    {
      id: 'single-vision',
      name: 'Single Vision',
      description: 'One focal power throughout the entire lens',
      price: 0,
      best_for: 'Basic vision correction',
      icon: '👁️',
    },
    {
      id: 'bifocal',
      name: 'Bifocal',
      description: 'Two different lens powers (distance + reading)',
      price: 50,
      best_for: 'Distance and near vision',
      icon: '📖',
    },
    {
      id: 'progressive',
      name: 'Progressive (No-Line)',
      description: 'Multiple focal powers with smooth transition',
      price: 120,
      best_for: 'Seamless all-distance vision',
      icon: '✨',
    },
    {
      id: 'blue-light',
      name: 'Blue Light Blocking',
      description: 'Reduces digital eye strain from screens',
      price: 35,
      best_for: 'Computer/screen users',
      icon: '💻',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Lens Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lensTypes.map((lens) => (
            <button
              key={lens.id}
              onClick={() => setSelectedLens(lens.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedLens === lens.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lens.icon}</span>
                    <h4 className="font-bold text-gray-900">{lens.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{lens.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">Best for:</span> {lens.best_for}
                  </p>
                </div>
                {selectedLens === lens.id && (
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm font-bold text-blue-600">
                {lens.price > 0 ? `+Rs ${lens.price}` : 'Included'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
