'use client';

import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-blue-100">Please read these terms carefully</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the Lensify website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. License</h2>
              <p>Lensify grants you a limited license to access and use this website for personal, non-commercial purposes. You may not reproduce, distribute, or transmit content without written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Responsibilities</h2>
              <p>You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Product Information</h2>
              <p>While we strive for accuracy, we do not warrant that product descriptions, pricing, or other content on this website is accurate, complete, or error-free.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
              <p>Lensify shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Indemnification</h2>
              <p>You agree to indemnify and hold harmless Lensify from any claims, damages, or costs arising from your violation of these terms or your use of the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Modifications to Terms</h2>
              <p>Lensify reserves the right to modify these terms at any time. Your continued use of the website constitutes your acceptance of the modified terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
              <p>These terms are governed by and construed in accordance with the laws of the jurisdiction in which Lensify operates.</p>
            </section>

            <p className="text-sm text-gray-500 mt-8">Last updated: November 2025</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
