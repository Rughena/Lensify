'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Eye, ShoppingCart, Heart } from 'lucide-react';
import { FrameSizeGuide } from '@/components/products/frame-size-guide';
import { LensOptionsSelector } from '@/components/products/lens-options-selector';
import { ProductSpecifications } from '@/components/products/product-specifications';
import { CustomerReviews } from '@/components/products/customer-reviews';
import { Footer } from '@/components/footer';
import { wishlistStore } from '@/lib/wishlistStore';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  shape: string;
  color: string;
  brand: string;
  material: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: number;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params?.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    if (!productId) return;
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
      setIsInWishlist(wishlistStore.isInWishlist(data._id));
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link href="/shop">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              Back to Shop
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const finalPrice = product.price - (product.price * product.discount) / 100;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.productId === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product._id,
        productName: product.name,
        quantity,
        price: finalPrice,
        imageUrl: product.imageUrl,
        brand: product.brand,
        size: selectedSize || 'Medium (S-M)',
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    window.dispatchEvent(new Event('storage'));
  };
  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        wishlistStore.removeFromWishlist(product._id);
        setIsInWishlist(false);
      } else {
        wishlistStore.addToWishlist({
          productId: product._id,
          productName: product.name,
          price: product.price,
          discount: product.discount,
          imageUrl: product.imageUrl,
          brand: product.brand,
          addedAt: Date.now(),
        });
        setIsInWishlist(true);
      }
    }
  };

  return (
    <>
    <main className="min-h-screen bg-white">
      {/* Navigation handled by Navbar component */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/shop" className="inline-block text-xs sm:text-sm text-gray-600 hover:text-gray-900 mb-6 sm:mb-8 font-medium">
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Image */}
          <div className="bg-gray-100 overflow-hidden flex items-center justify-center aspect-square rounded-sm sticky top-20 sm:top-24">
            <img
              src={product.imageUrl || '/placeholder.svg?height=500&width=500&query=eyeglasses'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="pb-4 sm:pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-2 sm:gap-3 mb-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">Rs {finalPrice.toFixed(0)}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-base sm:text-lg text-gray-400 line-through">Rs {product.price.toFixed(0)}</span>
                    <span className="text-xs sm:text-sm font-bold text-red-600">Save {product.discount}%</span>
                  </>
                )}
              </div>
              <p className={`text-xs sm:text-sm font-medium ${product.stock > 0 ? 'text-gray-600' : 'text-red-600'}`}>
                {product.stock > 0 ? '✓ In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <div className="pb-4 sm:pb-6 border-b border-gray-200">
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1 sm:mb-2">Shape</p>
                <p className="text-gray-900 font-medium text-xs sm:text-sm capitalize">{product.shape}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1 sm:mb-2">Color</p>
                <p className="text-gray-900 font-medium text-xs sm:text-sm capitalize">{product.color}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1 sm:mb-2">Material</p>
                <p className="text-gray-900 font-medium text-xs sm:text-sm capitalize">{product.material}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1 sm:mb-2">Category</p>
                <p className="text-gray-900 font-medium text-xs sm:text-sm capitalize">{product.category}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 font-bold transition-colors"
                >
                  −
                </button>
                <span className="text-gray-900 font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg py-3 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className={`px-4 border-2 ${isInWishlist ? 'border-red-600 text-red-600 bg-red-50' : 'border-gray-300 text-gray-700'} hover:border-red-400 rounded-lg transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <Link href="/try-on" className="block mb-4 sm:mb-6">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-2 sm:py-3 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base">
                <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
                Virtual Try-On
              </Button>
            </Link>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold text-green-900">✓ Authentic</p>
                <p className="text-xs text-green-700">100% Guaranteed</p>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm font-bold text-green-900">✓ 30-Day Return</p>
                <p className="text-xs text-green-700">Money Back</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lens Options Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-gray-200">
          <LensOptionsSelector />
        </div>

        {/* Frame Size Guide Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-gray-200">
          <FrameSizeGuide 
  selectedSize={selectedSize}
  onSizeSelect={setSelectedSize}
/>
        </div>

        {/* Product Specifications Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-gray-200">
          <ProductSpecifications product={product} />
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-gray-200">
          <CustomerReviews />
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
