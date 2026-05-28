'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Eye, Zap, Shield, Truck } from 'lucide-react';
import { TrustSection } from '@/components/trust-section';
import { ExpertConsultation } from '@/components/expert-consultation';
import { FAQSection } from '@/components/faq-section';
import { ReturnsWarrantySection } from '@/components/returns-warranty-section';
import { HowToOrderSection } from '@/components/how-to-order-section';
import { Footer } from '@/components/footer';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  brand: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=8');
      const data = await response.json();
setProducts(Array.isArray(data) ? data.slice(0, 8) : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }; 
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Dynamic */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 py-20 sm:py-32 lg:py-48">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" style={{
            backgroundImage: 'linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-left lg:text-left">
            {/* Floating Badge */}
            <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-bounce" style={{ animationDuration: '3s' }}>
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">✨ AI-Powered Shopping</span>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
              <span className="block mb-2">Find Your</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">Perfect Frames</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-blue-50 mb-8 leading-relaxed font-light max-w-xl">
              Try on glasses virtually, get AI recommendations, and shop premium eyewear from the comfort of home.
            </p>
            
            {/* Stats Preview */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-xl font-bold text-white">50K+</p>
                <p className="text-xs text-blue-100">Happy Customers</p>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-xl font-bold text-white">500+</p>
                <p className="text-xs text-blue-100">Premium Brands</p>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-xl font-bold text-white">100%</p>
                <p className="text-xs text-blue-100">Authentic</p>
              </div>
            </div>

            {/* CTA Buttons with Effects */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/shop" className="group w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
              <Link href="/try-on" className="group w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-2 border-white/80 font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Virtual Try-On
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex items-center justify-center h-full min-h-96">
            <div className="relative w-full max-w-sm">
              {/* Glow Effect - Enhanced blend */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-50"></div>
              {/* Image Container - Blended with background */}
              <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/30 p-4 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Woman wearing glasses" 
                  className="w-full h-auto rounded-xl object-cover shadow-2xl opacity-95 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                {/* Overlay blend effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-transparent to-blue-600/5 rounded-xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <Zap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Virtual Try-On</h3>
              <p className="text-sm text-gray-600">See how frames look on you before buying</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">100% Authentic</h3>
              <p className="text-sm text-gray-600">Genuine designer frames guaranteed</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <Truck className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over Rs 5,000</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <ArrowRight className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">New Arrivals</h2>
              <p className="text-lg text-gray-600">Discover the latest eyewear collections</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex text-blue-600 hover:text-blue-700 font-semibold items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product._id} href={`/products/${product._id}`}>
                  <div className="group cursor-pointer h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl">
                    {/* Product Image */}
                    <div className="relative bg-gray-100 aspect-square overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          -{product.discount}%
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col p-5 space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
                          {product.brand}
                        </p>
                        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-3 pt-2 border-t border-gray-100">
                        <p className="text-xl font-bold text-gray-900">
                          Rs {(product.price - (product.price * product.discount) / 100).toFixed(0)}
                        </p>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            Rs {product.price.toFixed(0)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-auto transition-all">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View All Mobile */}
          <div className="md:hidden mt-12 text-center">
            <Link href="/shop">
              <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Try Before You Buy
            </h2>
            <p className="text-xl text-blue-100">
              Experience our revolutionary virtual try-on technology powered by AI
            </p>
          </div>
          <Link href="/try-on">
            <Button className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto hover:scale-105">
              Start Virtual Try-On
              <Eye className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Expert Consultation Section */}
      <ExpertConsultation />

      {/* How to Order Section */}
      <HowToOrderSection />

      {/* Returns & Warranty Section */}
      <ReturnsWarrantySection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
