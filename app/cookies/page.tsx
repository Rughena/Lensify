'use client';

import { Footer } from '@/components/footer';

export default function CookiePolicyPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cookie Policy</h1>
            <p className="text-blue-100">How we use cookies on Lensify</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What are Cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit our website. They help us enhance your browsing experience and remember your preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Types of Cookies We Use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for basic website functionality</li>
                <li><strong>Analytical Cookies:</strong> Help us understand how you use our site</li>
                <li><strong>Marketing Cookies:</strong> Used to track your interests and show relevant ads</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Managing Your Cookies</h2>
              <p>You can control and delete cookies through your browser settings. However, disabling certain cookies may affect website functionality.</p>
            </section>

            <p className="text-sm text-gray-500">Last updated: November 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
