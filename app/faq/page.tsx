'use client';

import { Footer } from '@/components/footer';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied, simply contact us for a free return label.' },
    { q: 'Do you offer prescription frames?', a: 'Yes! All our frames are prescription-ready. You can add your prescription during checkout or have our experts help you.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 2-3 business days. We also offer express shipping for faster delivery.' },
    { q: 'Are your glasses authentic?', a: '100% authentic! All products are sourced directly from authorized distributors and come with certificates of authenticity.' },
    { q: 'Do you have a physical store?', a: 'Currently, Lensify operates online only. We offer virtual consultations with our expert team.' },
    { q: 'Can I use the virtual try-on?', a: 'Yes! Our AI-powered virtual try-on feature works on most devices. Simply upload a photo or use your camera.' },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
            </div>
            <p className="text-gray-600 text-lg">Find answers to common questions about Lensify</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-gray-900 select-none">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
