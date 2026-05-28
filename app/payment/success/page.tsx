'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { CheckCircle, Package, Copy, Check } from 'lucide-react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get the latest order's order number
    const fetchLatestOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const orders = await response.json();
        if (Array.isArray(orders) && orders.length > 0) {
          setOrderNumber(orders[0].orderNumber || '');
        }
      } catch (error) {
        console.error('Failed to fetch order number:', error);
      }
    };
    fetchLatestOrder();
  }, []);

  const handleCopy = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed! 🎉</h1>
          <p className="text-gray-600 mb-2">Thank you for your order! Please keep cash ready for delivery.</p>
          <p className="text-gray-500 text-sm mb-8">
            Your order is being processed and will be shipped within 2-3 business days.
          </p>

          {/* Order Number */}
          {orderNumber && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Package className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-semibold text-blue-900">Your Order Number</p>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-3">{orderNumber}</p>
              <p className="text-xs text-gray-500 mb-3">
                Save this number to track your order
              </p>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Order Number
                  </>
                )}
              </button>
            </div>
          )}

          {/* Transaction ID */}
          {transactionId && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8">
              <p className="text-xs text-gray-500 mb-1">Transaction ID:</p>
              <p className="font-mono text-sm text-gray-700 break-all">{transactionId}</p>
            </div>
          )}

          {/* Track Order Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm font-semibold text-yellow-800 mb-1">📦 How to track your order</p>
            <p className="text-xs text-yellow-700">
              Use your order number <strong>{orderNumber}</strong> on the Track Order page to check your delivery status anytime.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link href="/track-order" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl">
                Track My Order
              </Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 font-semibold py-3 rounded-xl">
                View All Orders
              </Button>
            </Link>
            <Link href="/shop" className="block">
              <button className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}