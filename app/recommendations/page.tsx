'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/products/product-card';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  shape: string;
}

const faceShapes = [
  {
    id: 'oval',
    name: 'Oval',
    emoji: '🥚',
    description: 'Balanced proportions, slightly wider forehead',
    recommendedShapes: ['rectangle', 'square', 'round', 'oval', 'cat-eye', 'hexagon'],
    tip: 'Lucky you! Oval faces suit almost any frame shape.',
    avoid: 'Nothing — you can wear any style!',
  },
  {
    id: 'round',
    name: 'Round',
    emoji: '⭕',
    description: 'Full cheeks, rounded chin, similar width and length',
    recommendedShapes: ['rectangle', 'square', 'hexagon'],
    tip: 'Angular frames add definition and make your face appear slimmer.',
    avoid: 'Round or small frames that emphasize roundness',
  },
  {
    id: 'square',
    name: 'Square',
    emoji: '⬜',
    description: 'Strong jawline, broad forehead, angular features',
    recommendedShapes: ['round', 'oval', 'cat-eye'],
    tip: 'Curved frames soften your strong angular features beautifully.',
    avoid: 'Square or boxy frames that make jaw look wider',
  },
  {
    id: 'heart',
    name: 'Heart',
    emoji: '❤️',
    description: 'Wider forehead, narrow chin, high cheekbones',
    recommendedShapes: ['round', 'oval', 'rectangle'],
    tip: 'Bottom-heavy frames balance your wider forehead perfectly.',
    avoid: 'Cat-eye or decorative top-heavy frames',
  },
  {
    id: 'oblong',
    name: 'Oblong',
    emoji: '📏',
    description: 'Long and narrow face, high forehead',
    recommendedShapes: ['round', 'square', 'oval'],
    tip: 'Wide frames with depth add width and break up the length.',
    avoid: 'Small or narrow frames that elongate the face',
  },
];

export default function RecommendationsPage() {
  const [selectedFaceShape, setSelectedFaceShape] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const selectedShape = faceShapes.find(f => f.id === selectedFaceShape);

  useEffect(() => {
    if (selectedFaceShape) {
      fetchRecommendations();
    }
  }, [selectedFaceShape, selectedCategory]);

  const fetchRecommendations = async () => {
    if (!selectedShape) return;
    setLoading(true);
    try {
      const allProducts: Product[] = [];

      for (const shape of selectedShape.recommendedShapes) {
        const params = new URLSearchParams();
        params.append('shape', shape);
        if (selectedCategory) params.append('category', selectedCategory);

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          allProducts.push(...data);
        }
      }

      // Remove duplicates
      const unique = allProducts.filter(
        (p, idx, self) => idx === self.findIndex(t => t._id === p._id)
      );
      setProducts(unique);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Find Your Perfect Frames</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Select your face shape and we'll recommend the best frames just for you
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* Face Shape Selector */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              What's Your Face Shape?
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Not sure? Look straight into a mirror and trace the outline of your face.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {faceShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => setSelectedFaceShape(shape.id)}
                  className={`p-6 rounded-2xl border-2 text-center transition-all hover:shadow-lg ${
                    selectedFaceShape === shape.id
                      ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="text-4xl mb-3">{shape.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-1">{shape.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{shape.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          {selectedShape && (
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    ✅ Style Tip
                  </h3>
                  <p className="text-blue-800 text-sm">{selectedShape.tip}</p>
                </div>
                <div>
                  <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    ❌ Avoid
                  </h3>
                  <p className="text-red-800 text-sm">{selectedShape.avoid}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Best frame shapes for you:</span>{' '}
                  {selectedShape.recommendedShapes.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Category Filter */}
          {selectedShape && (
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {['', 'men', 'women', 'unisex'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                >
                  {cat === '' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {selectedShape && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {loading ? 'Finding your perfect frames...' : `${products.length} Frames Recommended For You`}
              </h2>

              {loading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-blue-600 mb-4 mx-auto"></div>
                    <p className="text-gray-600 font-medium">Finding your perfect frames...</p>
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      discount={product.discount}
                      imageUrl={product.imageUrl}
                      rating={product.rating}
                      reviews={product.reviews}
                      brand={product.brand}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                  <p className="text-4xl mb-4">🔍</p>
                  <p className="text-xl font-bold text-gray-900 mb-2">No frames found</p>
                  <p className="text-gray-500">Try a different category filter</p>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {!selectedShape && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <p className="text-6xl mb-4">👆</p>
              <p className="text-xl font-bold text-gray-900 mb-2">Select your face shape above</p>
              <p className="text-gray-500">We'll instantly show you the best frames for your face</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}