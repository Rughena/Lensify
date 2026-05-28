'use client';

import { Footer } from '@/components/footer';

export default function ShippingInfoPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Shipping Information</h1>
            <p className="text-blue-100">Learn about our fast and reliable delivery options</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Methods</h2>
              <div className="space-y-4">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Standard Shipping (2-3 Business Days)</h3>
                  <p className="text-gray-700">Free for orders over Rs 2,000. Rs 100 for orders under Rs 2,000.</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Express Shipping (1 Business Day)</h3>
                  <p className="text-gray-700">Rs 300. Perfect for urgent orders.</p>
                </div>
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Overnight Shipping (Next Day)</h3>
                  <p className="text-gray-700">Rs 500. For same-city deliveries.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All orders are carefully packed and quality-checked before shipment. Processing typically takes 1-2 business days (Monday-Friday). Orders placed on weekends will be processed the following Monday.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You'll receive a tracking number via email once your order ships. Track your package in real-time from our app or website. Tracking information updates every few hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Shipping</h2>
              <p className="text-gray-700 leading-relaxed">
                We currently ship to major countries worldwide. International orders typically take 7-14 business days. Customs duties and taxes are the responsibility of the customer.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
