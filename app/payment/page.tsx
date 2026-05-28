'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { Truck, ShieldCheck, Package } from 'lucide-react';

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const total = searchParams.get('total');
    const order = searchParams.get('orderId');
    if (total && order) {
      setAmount(parseFloat(total));
      setOrderId(order);
    }
  }, [searchParams]);

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          gateway: 'cash_on_delivery',
          transactionId: `COD-${Date.now()}`,
          status: 'success',
        }),
      });
      router.push(`/payment/success?transactionId=COD-${Date.now()}`);
    } catch (error) {
      console.error('Order confirmation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Link href="/checkout" className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-8 inline-block">
            ← Back to Checkout
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Cash on Delivery</h1>
              <p className="text-gray-500 text-sm">Pay when your order arrives at your doorstep</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono text-gray-800 text-xs">{orderId?.slice(-12)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-semibold text-gray-800">Cash on Delivery</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">Rs {amount.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-bold text-blue-900 mb-3">How Cash on Delivery works:</h3>
              <div className="space-y-2">
                {[
                  'Place your order by clicking confirm below',
                  'We prepare and ship your order within 1-2 days',
                  'Delivery in 3-5 business days across Pakistan',
                  'Pay in cash when the order arrives at your door',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-blue-800">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-xs font-medium text-green-800">100% Secure Order</p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-xs font-medium text-green-800">30-Day Return Policy</p>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-lg"
            >
              {loading ? 'Confirming Order...' : 'Confirm Order — Pay on Delivery'}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              By confirming you agree to our terms and conditions
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
}