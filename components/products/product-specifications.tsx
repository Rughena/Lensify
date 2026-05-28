'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Product {
  name: string;
  material: string;
  shape: string;
  color: string;
  brand: string;
  category: string;
}

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const [expandedTab, setExpandedTab] = useState('specs');

  const tabs = [
    {
      id: 'specs',
      label: 'Specifications',
      icon: '📋',
      content: [
        { label: 'Material', value: product.material || 'N/A' },
        { label: 'Frame Size', value: '54-17-140 mm' },
        { label: 'Weight', value: '18g' },
        { label: 'Shape', value: product.shape || 'N/A' },
        { label: 'Color', value: product.color || 'N/A' },
        { label: 'Bridge Width', value: '17mm' },
        { label: 'Temple Length', value: '140mm' },
        { label: 'Brand', value: product.brand || 'N/A' },
      ],
    },
    {
      id: 'features',
      label: 'Features',
      icon: '✨',
      content: [
        { label: 'UV Protection', value: '100% UV 400' },
        { label: 'Anti-Glare', value: 'Yes - Premium Coating' },
        { label: 'Scratch Resistant', value: 'Yes - Hard Coated' },
        { label: 'Water Resistant', value: 'Yes - Hydrophobic' },
        { label: 'Flexible Hinges', value: 'Yes - Spring Hinges' },
        { label: 'Warranty', value: '2 Years' },
        { label: 'Case Included', value: 'Yes - Premium Case' },
        { label: 'Cleaning Cloth', value: 'Yes - Microfiber' },
      ],
    },
    {
      id: 'care',
      label: 'Care Guide',
      icon: '🧹',
      content: [
        { label: 'Daily Cleaning', value: 'Use microfiber cloth and lukewarm water' },
        { label: 'Storage', value: 'Store in provided case when not in use' },
        { label: 'Avoid', value: 'Harsh chemicals, extreme heat, dropping' },
        { label: 'Repair', value: 'Visit optician for professional adjustments' },
        { label: 'Durability', value: 'Lasts 3-5 years with proper care' },
      ],
    },
    {
      id: 'prescription',
      label: 'Prescription Info',
      icon: '👓',
      content: [
        { label: 'Prescription Ready', value: 'Yes - All Powers Available' },
        { label: 'Bifocal Available', value: 'Yes - Add up to +3.50' },
        { label: 'Progressive Available', value: 'Yes - All corridors' },
        { label: 'Reading Glasses', value: 'Available' },
        { label: 'Sun Prescription', value: 'Available with all options' },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h3>
      <div className="space-y-3">
        {tabs.map((tab) => (
          <div key={tab.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
            <button
              onClick={() => setExpandedTab(expandedTab === tab.id ? '' : tab.id)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{tab.icon}</span>
                <span className="font-bold text-gray-900">{tab.label}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedTab === tab.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedTab === tab.id && (
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tab.content.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-gray-600">
                        {item.label}:
                      </span>
                      <span className="text-sm font-bold text-gray-900 text-right capitalize">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}