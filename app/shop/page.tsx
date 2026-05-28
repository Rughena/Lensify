'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { ProductFilters } from '@/components/products/product-filters';
import { Footer } from '@/components/footer';
import { Menu, X, Sparkles } from 'lucide-react';

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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedShape) params.append('shape', selectedShape);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sortBy === 'price-low') params.append('sort', 'price-asc');
      else if (sortBy === 'price-high') params.append('sort', 'price-desc');
      else if (sortBy === 'newest') params.append('sort', 'newest');
      else params.append('sort', 'newest');

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedShape, sortBy, minPrice, maxPrice]);

  // Runs on first load AND whenever filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedShape('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
  };

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-sm font-semibold text-blue-100 uppercase tracking-widest">Premium Collection</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">Discover Your Style</h1>
          <p className="text-lg text-blue-50 max-w-2xl">Browse our curated collection of premium eyewear</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-2 font-semibold hover:shadow-lg transition-all text-sm"
          >
            {showFilters ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>

          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="sticky top-20 sm:top-24 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-7 border border-gray-200 shadow-lg">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-7">Filters & Search</h3>

              <ProductFilters
                onCategoryChange={setSelectedCategory}
                onShapeChange={setSelectedShape}
                selectedCategory={selectedCategory}
                selectedShape={selectedShape}
              />

              {/* Price Range Filter */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Price Range (PKR)</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={fetchProducts}
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Apply Price Filter
                </button>
              </div>

              {/* Clear All */}
              <button
                onClick={handleClearFilters}
                className="w-full mt-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-200">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Results</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {products.length} <span className="text-sm sm:text-base text-gray-500 font-normal">products</span>
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 cursor-pointer hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors w-full sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading products...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {products.map((product, idx) => (
                  <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      discount={product.discount}
                      imageUrl={product.imageUrl}
                      rating={product.rating}
                      reviews={product.reviews}
                      brand={product.brand}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-24 bg-white rounded-xl sm:rounded-2xl border border-gray-200 px-4">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">No products found</p>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Try adjusting your filters</p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}