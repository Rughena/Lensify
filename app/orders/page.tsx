'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'processing' | 'ready_to_ship' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress?: string;
}

const STATUS_STYLES: Record<string, { bg: string; label: string; icon: string }> = {
  processing:    { bg: 'bg-yellow-100 text-yellow-700 border-yellow-300',  label: 'Processing',    icon: '⏳' },
  ready_to_ship: { bg: 'bg-blue-100 text-blue-700 border-blue-300',        label: 'Ready to Ship', icon: '📦' },
  shipped:       { bg: 'bg-indigo-100 text-indigo-700 border-indigo-300',  label: 'Shipped',       icon: '🚚' },
  delivered:     { bg: 'bg-green-100 text-green-700 border-green-300',     label: 'Delivered',     icon: '✅' },
  cancelled:     { bg: 'bg-red-100 text-red-700 border-red-300',           label: 'Cancelled',     icon: '❌' },
};

// Visual progress stepper
function OrderProgress({ status }: { status: string }) {
  const steps = ['processing', 'ready_to_ship', 'shipped', 'delivered'];
  const currentIndex = steps.indexOf(status);
  if (status === 'cancelled') return (
    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
      <span className="text-red-600 text-sm font-medium">❌ This order was cancelled</span>
    </div>
  );
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((step, i) => {
        const done = i <= currentIndex;
        const labels: Record<string, string> = {
          processing: 'Processing', ready_to_ship: 'Ready', shipped: 'Shipped', delivered: 'Delivered'
        };
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                done
                  ? 'bg-purple-600 border-purple-600 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}>
                {done ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1 text-center ${done ? 'text-purple-700 font-medium' : 'text-gray-400'}`}>
                {labels[step]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mb-5 ${i < currentIndex ? 'bg-purple-600' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    fetchOrders(token);
  }, [router]);

  // ✅ Fetch real orders from MongoDB via API
  const fetchOrders = async (token: string) => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const orderList = Array.isArray(data) ? data : [];
        setOrders(orderList);
        // Auto-select most recent order
        if (orderList.length > 0) setSelectedOrder(orderList[0]);
      } else {
        setError('Failed to load orders. Please try again.');
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
      setError('Something went wrong loading your orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const getStatusStyle = (status: string) =>
    STATUS_STYLES[status]?.bg ?? 'bg-gray-100 text-gray-700 border-gray-300';
  const getStatusLabel = (status: string) =>
    STATUS_STYLES[status]?.label ?? status;
  const getStatusIcon = (status: string) =>
    STATUS_STYLES[status]?.icon ?? '📋';

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900">Lensify</Link>
            <div className="flex gap-6 items-center">
              <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900">Shop</Link>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900">Profile</Link>
              <Button onClick={handleLogout} className="bg-black hover:bg-gray-900 text-white font-medium px-6 py-2 text-sm rounded-sm">
                Sign Out
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">My Orders</h1>
          <p className="text-sm text-gray-500 mb-8">Track and view all your orders</p>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-white animate-pulse rounded-xl border border-gray-200" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
              <p className="text-5xl mb-4">🕶️</p>
              <p className="text-gray-700 font-medium mb-2">No orders yet</p>
              <p className="text-gray-400 text-sm mb-8">Your orders will appear here once you place them</p>
              <Link href="/shop">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Orders List */}
              <div className="lg:col-span-1 space-y-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">
                  {orders.length} order{orders.length !== 1 ? 's' : ''}
                </p>
                {orders.map(order => (
                  <div
                    key={order._id}
                    onClick={() => setSelectedOrder(order)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      selectedOrder?._id === order._id
                        ? 'border-purple-500 bg-purple-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-mono font-semibold text-gray-900 text-sm">
                        #{order.orderNumber ?? order._id.slice(-8).toUpperCase()}
                      </p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)} {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">
                      {new Date(order.createdAt).toLocaleDateString('en-PK', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Rs {order.totalAmount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="lg:col-span-2">
                {selectedOrder ? (
                  <div className="bg-white border border-gray-200 rounded-2xl p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Order ID</p>
                        <p className="font-mono font-bold text-gray-900 text-lg">
                          #{selectedOrder.orderNumber ?? selectedOrder._id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-PK', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`text-sm font-semibold px-4 py-2 rounded-xl border ${getStatusStyle(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)} {getStatusLabel(selectedOrder.status)}
                      </span>
                    </div>

                    {/* Progress tracker */}
                    <OrderProgress status={selectedOrder.status} />

                    {/* Items */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Items Ordered</h3>
                      <div className="space-y-3">
                        {selectedOrder.items?.length > 0 ? (
                          selectedOrder.items.map((item, i) => (
                            <div key={i} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-12 object-contain rounded-lg bg-white border border-gray-100"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900 text-sm">{item.name ?? `Item ${i + 1}`}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity ?? 1}</p>
                              </div>
                              <p className="font-semibold text-gray-900 text-sm">
                                Rs {((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 text-sm">No item details available</p>
                        )}
                      </div>
                    </div>

                    {/* Shipping address */}
                    {selectedOrder.shippingAddress && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Shipping Address</h3>
                        <p className="text-gray-600 text-sm bg-gray-50 border border-gray-100 rounded-xl p-4">
                          📍 {selectedOrder.shippingAddress}
                        </p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-gray-100 pt-5">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Subtotal</span>
                        <span>Rs {selectedOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-200 pt-3">
                        <span>Total</span>
                        <span className="text-purple-700">Rs {selectedOrder.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                      <Link href="/shop" className="flex-1">
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex items-center justify-center h-80">
                    <p className="text-gray-400 text-sm">Select an order to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}