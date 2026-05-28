'use client';

import { Footer } from '@/components/footer';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  const steps = [
    {
      icon: AlertCircle,
      title: 'Step 1: Initiate Return',
      description: 'Contact our customer service team with your order number. We\'ll provide a prepaid return label and instructions.',
    },
    {
      icon: RotateCcw,
      title: 'Step 2: Ship Back',
      description: 'Pack your item securely in original packaging if possible. Print the return label and drop it off at any carrier location.',
    },
    {
      icon: Clock,
      title: 'Step 3: Processing',
      description: 'Once we receive your return, we\'ll inspect and process it within 3-5 business days.',
    },
    {
      icon: CheckCircle,
      title: 'Step 4: Refund',
      description: 'After approval, your refund will be issued to your original payment method within 5-7 business days.',
    },
  ];

  const faqs = [
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day return policy. Items must be in original condition, unused, and in original packaging. Customized or prescription items may have different terms.',
    },
    {
      q: 'Who pays for return shipping?',
      a: 'For defective items or our mistakes, we provide a prepaid return label. For standard returns, return shipping costs are deducted from your refund (typically $5-10).',
    },
    {
      q: 'How long does the refund take?',
      a: 'After we receive and inspect your return, processing takes 3-5 business days. The refund appears in your account within 5-7 business days.',
    },
    {
      q: 'Can I exchange instead of returning?',
      a: 'Absolutely! Exchanges for different sizes, colors, or styles are free. Just mention your preference when initiating the return.',
    },
    {
      q: 'What items are not returnable?',
      a: 'Customized frames, prescription lenses, safety glasses, and items purchased as final sale are not returnable. Always check the product page for specifics.',
    },
    {
      q: 'Do I need to return items in original packaging?',
      a: 'While not required, original packaging helps prevent damage during transit. We recommend using it when possible. Damaged items may result in reduced refunds.',
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <RotateCcw className="w-10 h-10" />
              <h1 className="text-4xl sm:text-5xl font-bold">Returns & Exchanges</h1>
            </div>
            <p className="text-lg sm:text-xl text-blue-100">We want you to love your purchase. If you don't, returning is easy.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Return Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">How Returns Work</h2>
            <div className="space-y-6">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Info */}
          <section className="mb-16 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-3xl font-bold text-blue-600 mb-2">30 Days</p>
              <p className="text-gray-700">Return within 30 days of purchase for full refund</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-3xl font-bold text-purple-600 mb-2">Free Labels</p>
              <p className="text-gray-700">We provide prepaid return labels for defective items</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-3xl font-bold text-indigo-600 mb-2">5-7 Days</p>
              <p className="text-gray-700">Refunds processed quickly once we receive your return</p>
            </div>
          </section>

          {/* Return Conditions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Return Conditions</h2>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Items must be:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unused and in original condition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>In original packaging or protective case</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Include all accessories and documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Free of damage (normal shipping wear acceptable)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Frequently Asked Questions</h2>
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
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Our customer service team is here to help. Contact us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@lensify.com"
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Email Support
              </a>
              <a
                href="/contact-us"
                className="px-8 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors border border-white/50"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
