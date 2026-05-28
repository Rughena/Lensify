import { CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';

interface WarrantyItem {
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
}

export function ReturnsWarrantySection() {
  const warrantyItems: WarrantyItem[] = [
    {
      title: '30-Day Money Back Guarantee',
      description:
        'Not satisfied? Return your glasses within 30 days for a full refund, no questions asked.',
      duration: '30 days',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: '1-Year Frame Warranty',
      description:
        'Defective frames due to manufacturing? We\'ll replace them free of charge within the first year.',
      duration: '1 year',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: '6-Month Lens Warranty',
      description:
        'Lens defects, scratches, or coating issues covered within 6 months of purchase.',
      duration: '6 months',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: 'Free Adjustments & Repairs',
      description:
        'Bent frames, loose hinges, or other issues? We offer lifetime free repairs and adjustments.',
      duration: 'Lifetime',
      icon: <AlertCircle className="w-6 h-6" />,
    },
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us via phone, email, or app to start your return',
    },
    {
      step: 2,
      title: 'Receive Label',
      description: 'We\'ll email you a pre-paid shipping label',
    },
    {
      step: 3,
      title: 'Ship Back',
      description: 'Pack your glasses and drop off at any courier point',
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Receive your refund within 7 business days',
    },
  ];

  const faqItems = [
    {
      q: 'Can I return glasses without a reason?',
      a: 'Yes! Our 30-day guarantee allows returns for any reason - no questions asked.',
    },
    {
      q: 'Do I need my original receipt?',
      a: 'No, we can look up your order using your email address or order ID.',
    },
    {
      q: 'What if I damaged my glasses?',
      a: 'Light scratches and normal wear are covered under our warranty. Intentional damage may not be eligible.',
    },
    {
      q: 'Can I exchange instead of refund?',
      a: 'Absolutely! Exchange to any other frame or lens option at no extra cost within 30 days.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Returns & Warranty
          </h2>
          <p className="text-lg text-gray-600">
            Shop with confidence. We stand behind every pair of glasses.
          </p>
        </div>

        {/* Warranty Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {warrantyItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-transparent hover:border-blue-400 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-blue-600 flex-shrink-0 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {item.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Simple Return Process
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {returnSteps.map((step) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {step.step < returnSteps.length && (
                  <div className="hidden md:block absolute top-12 left-[60%] right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                )}

                {/* Card */}
                <div className="relative bg-white border-2 border-blue-400 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Return FAQs
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <h4 className="font-bold text-gray-900 mb-2">{item.q}</h4>
                <p className="text-gray-700 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Need to start a return?</h3>
          <p className="mb-6 text-blue-100">
            Contact our support team and we\'ll help you every step of the way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Start Return
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
