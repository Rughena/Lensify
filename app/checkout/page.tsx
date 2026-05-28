'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      setError('Please log in to proceed with checkout');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }

    setIsAuthenticated(true);

    const userData = JSON.parse(user);
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
      }));
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Session expired. Please log in again.');
        router.push('/login');
        return;
      }

      if (cartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const tax = subtotal * 0.1;
      const totalAmount = subtotal + tax;

      if (!formData.address || !formData.city || !formData.country || !formData.zipCode) {
        throw new Error('Please fill in all shipping information');
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.country} ${formData.zipCode}`,
          paymentMethod: 'pending',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Order creation failed (${response.status})`);
      }

      const orderData = await response.json();
      
      // Clear cart after successful order
      localStorage.removeItem('cart');
      
      const paymentParams = new URLSearchParams({
        orderId: orderData._id,
        total: totalAmount.toFixed(2),
      });
      router.push(`/payment?${paymentParams}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Checkout error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!isAuthenticated && error) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation handled by Navbar component */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/cart" className="inline-block text-sm text-gray-600 hover:text-gray-900 font-medium mb-4">
            ← Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 text-sm rounded-sm"
              >
                {loading ? 'Processing...' : 'Continue to Order Confirmation'}
              </Button>
            </form>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-gray-200 rounded-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Order Summary</h3>

              <div className="space-y-2 border-b border-gray-200 pb-6 mb-6 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      Product x{item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">Rs {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-medium">Rs {subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="text-gray-900 font-medium">Rs {tax.toFixed(0)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>Rs {total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
