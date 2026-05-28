'use client';

import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingResult(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/orders?orderNumber=${orderNumber.trim()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await response.json();

      if (!response.ok) {
  setError('No order found with this order number. Please check and try again.');
  return;
}
if (!data || (Array.isArray(data) && data.length === 0)) {
  setError('No order found with this order number. Please check and try again.');
  return;
}

      const order = Array.isArray(data) ? data[0] : data;
      setTrackingResult(order);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: 'Order Placed', icon: Package, done: true },
      { label: 'Processing', icon: Clock, done: ['processing', 'shipped', 'delivered'].includes(status) },
      { label: 'Shipped', icon: Truck, done: ['shipped', 'delivered'].includes(status) },
      { label: 'Delivered', icon: CheckCircle, done: status === 'delivered' },
    ];
    return steps;
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600 text-lg">Enter your order number to track your shipment</p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                placeholder="Enter order number (e.g., LNF-123456)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Track Order'}
              </button>
            </div>
          </div>

          {/* Tracking Result */}
          {trackingResult && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>

              {/* Status Steps */}
              <div className="flex items-center justify-between mb-8">
                {getStatusSteps(trackingResult.status).map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step.done ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className={`text-xs font-medium text-center ${
                        step.done ? 'text-blue-600' : 'text-gray-400'
                      }`}>{step.label}</p>
                      {idx < 3 && (
                        <div className={`h-1 w-full mt-2 ${
                          step.done ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Order Details */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Order Number:</span>
                  <span className="font-bold text-gray-900">{trackingResult.orderNumber || trackingResult._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className="font-bold text-blue-600 capitalize">{trackingResult.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Total Amount:</span>
                  <span className="font-bold text-gray-900">Rs {trackingResult.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Order Date:</span>
                  <span className="font-bold text-gray-900">
                    {new Date(trackingResult.createdAt).toLocaleDateString('en-PK')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* View My Orders */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Don't have your order number?</h2>
            <p className="text-gray-700 mb-4">You can find your order number in your confirmation email or account dashboard.</p>
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
              View My Orders →
            </Link>
          </div>

          {/* Need Help */}
          <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">If you're having trouble tracking your order, our customer support team is here to help.</p>
            <Link href="/contact-us" className="text-blue-600 hover:text-blue-700 font-semibold">
              Contact Support →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}