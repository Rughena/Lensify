'use client';

import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  onCategoryChange: (category: string) => void;
  onShapeChange: (shape: string) => void;
  selectedCategory: string;
  selectedShape: string;
}

export function ProductFilters({
  onCategoryChange,
  onShapeChange,
  selectedCategory,
  selectedShape,
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    shape: true,
  });

  const categories = ['men', 'women', 'unisex', 'contacts'];
  const shapes = ['oval', 'round', 'square', 'rectangle', 'cat-eye', 'hexagon'];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleClearFilters = () => {
    onCategoryChange('');
    onShapeChange('');
  };

  const hasActiveFilters = selectedCategory || selectedShape;

  return (
    <div className="space-y-5">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 rounded-xl transition-all text-sm font-bold border border-red-200 hover:border-red-300"
        >
          <X className="w-4 h-4" />
          Reset All Filters
        </button>
      )}

      {/* Category Filter */}
      <div className="border border-gray-300 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white hover:border-blue-400 transition-colors">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all border-b border-gray-200"
        >
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Category</h3>
          <ChevronDown
            className={`w-5 h-5 text-blue-600 transition-transform ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="p-5 space-y-3 bg-white">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => onCategoryChange(selectedCategory === cat ? '' : cat)}
                  className="w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors capitalize">
                  {cat === 'men' ? 'For Men' : cat === 'women' ? 'For Women' : cat === 'unisex' ? 'Unisex' : 'Contact Lenses'}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Shape Filter */}
      <div className="border border-gray-300 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white hover:border-blue-400 transition-colors">
        <button
          onClick={() => toggleSection('shape')}
          className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all border-b border-gray-200"
        >
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Shape</h3>
          <ChevronDown
            className={`w-5 h-5 text-blue-600 transition-transform ${
              expandedSections.shape ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.shape && (
          <div className="p-5 space-y-3 bg-white">
            {shapes.map((shape) => (
              <label key={shape} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedShape === shape}
                  onChange={() => onShapeChange(selectedShape === shape ? '' : shape)}
                  className="w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors capitalize">
                  {shape}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}