'use client';

import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-blue-100">Your privacy is important to us</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as name, email, and payment details. We also collect information about your browsing and shopping activities to improve our service.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to process orders, provide customer support, send marketing communications (with your consent), and improve our website and services.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted and processed through secure channels.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
            <p>We do not sell or share your personal information with third parties without your consent, except as necessary to fulfill your order or comply with legal obligations.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. Contact us at support@lensify.com for assistance.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies</h2>
            <p>We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but this may affect website functionality.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Contact Us</h2>
            <p>If you have questions about our privacy practices, please contact us at privacy@lensify.com.</p>

            <p className="text-sm text-gray-500 mt-8">Last updated: November 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
