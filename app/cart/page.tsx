'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  productId: string;
  productName?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  brand?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    setLoading(false);
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const updated = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation handled by Navbar component */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cart</h1>
          <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 mb-6">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-gray-900 hover:bg-black text-white font-semibold px-8 py-3 rounded-sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex gap-6 pb-6 border-b border-gray-200"
                >
                  {/* Product Image */}
                  {item.imageUrl && (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gray-100 rounded-sm overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {item.productName || `Product ${item.productId}`}
                    </h3>
                    {item.brand && (
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">{item.brand}</p>
                    )}

                    {/* Quantity and Remove */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-gray-300 rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-xs text-gray-500 hover:text-red-600 transition-colors font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      Rs {((item.price || 0) * item.quantity).toFixed(0)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Rs {(item.price || 0).toFixed(0)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-sm p-6 space-y-6 sticky top-24">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Order Summary</h2>

                {/* Totals */}
                <div className="space-y-3 text-sm border-b border-gray-200 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900">Rs {subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="text-gray-900">Rs {tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div>
                  <div className="flex justify-between mb-6">
                    <span className="text-sm font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      Rs {total.toFixed(0)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-sm transition-colors mb-2">
                      Checkout
                    </Button>
                  </Link>

                  {/* Continue Shopping Link */}
                  <Link href="/shop">
                    <button className="w-full text-sm text-gray-600 hover:text-gray-900 py-2 transition-colors">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
