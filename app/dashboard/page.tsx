'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chatbot/chat-widget';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, MapPin, LogOut, TrendingUp, Package, Eye } from 'lucide-react';

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: any[];
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    
    if (userData.role === 'admin') {
      router.push('/admin/dashboard');
      return;
    }

    // Fetch user profile from API
    fetchUserProfile(token, userData);
    fetchOrders(token);
  }, [router]);

  const fetchUserProfile = async (token: string, storedData: User) => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Fall back to stored data if API fails
        setUser(storedData);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Fall back to stored data
      setUser(storedData);
    }
  };

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }

    // Update wishlist count from localStorage
    const wishlist = JSON.parse(localStorage.getItem('lensify_wishlist') || '[]');
    const wishlistCountElement = document.getElementById('wishlistCount');
    if (wishlistCountElement) {
      wishlistCountElement.textContent = wishlist.length.toString();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-lg text-gray-600">Manage your orders, wishlist, and account preferences</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-bold mb-2">Total Orders</p>
                <h3 className="text-3xl font-bold text-gray-900">{orders.length}</h3>
                <p className="text-xs text-gray-500 mt-2">All-time purchases</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-blue-200 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-bold mb-2">Total Spent</p>
                <h3 className="text-3xl font-bold text-gray-900">Rs {orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(0)}</h3>
                <p className="text-xs text-gray-500 mt-2">Lifetime value</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-200 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide font-bold mb-2">In Wishlist</p>
                <h3 className="text-3xl font-bold text-gray-900" id="wishlistCount">0</h3>
                <p className="text-xs text-gray-500 mt-2">Saved items</p>
              </div>
              <Heart className="w-12 h-12 text-red-200 opacity-50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/shop" className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gray-900">Continue Shopping</h3>
            </div>
            <p className="text-sm text-gray-600">Browse and discover new eyewear</p>
          </Link>

          <Link href="/try-on" className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gray-900">Virtual Try-On</h3>
            </div>
            <p className="text-sm text-gray-600">See how glasses look on you</p>
          </Link>

          <Link href="/profile" className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-gray-900">My Profile</h3>
            </div>
            <p className="text-sm text-gray-600">Manage addresses and settings</p>
          </Link>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">

          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            Order History
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-6">No orders yet</p>
              <Link href="/shop">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <ShoppingBag className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Order ID: {order._id.substring(0, 12)}...</p>
                          <p className="text-gray-900 font-semibold text-lg">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 mb-3">
                        Rs {order.totalAmount.toFixed(0)}
                      </p>
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  );
}
