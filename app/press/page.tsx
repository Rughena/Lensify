'use client';

import { Footer } from '@/components/footer';

export default function PressPressPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Press & Media</h1>
            <p className="text-blue-100">News and updates about Lensify</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
            <div className="space-y-6">
              <article className="border-l-4 border-blue-600 pl-6 py-2">
                <p className="text-xs text-gray-500 mb-1">December 2025</p>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Lensify Launches AI-Powered Virtual Try-On</h3>
                <p className="text-gray-600">Revolutionary eyewear shopping experience with advanced AR technology.</p>
              </article>
              <article className="border-l-4 border-purple-600 pl-6 py-2">
                <p className="text-xs text-gray-500 mb-1">November 2025</p>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Lensify Reaches 50,000 Happy Customers</h3>
                <p className="text-gray-600">Milestone achieved in our mission to revolutionize eyewear shopping.</p>
              </article>
              <article className="border-l-4 border-blue-600 pl-6 py-2">
                <p className="text-xs text-gray-500 mb-1">October 2025</p>
                <h3 className="font-bold text-lg text-gray-900 mb-2">New Partnership with Premium Brands</h3>
                <p className="text-gray-600">Expanding our collection with 50+ new designer brands.</p>
              </article>
            </div>
          </section>

          <section className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Press Kit</h2>
            <p className="text-gray-700 mb-6">Download our press kit including company information, logos, and media assets.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
              Download Press Kit
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
