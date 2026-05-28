import { Shield, Truck, ArrowLeftRight, Headphones, CheckCircle2, Zap } from 'lucide-react';

export function TrustSection() {
  const trustItems = [
    {
      icon: Shield,
      title: '100% Authentic',
      description: 'Genuine products from authorized brands',
    },
    {
      icon: CheckCircle2,
      title: '30-Day Money Back',
      description: 'Not satisfied? Full refund guarantee',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above Rs 2,000',
    },
    {
      icon: ArrowLeftRight,
      title: 'Free Exchanges',
      description: 'If size or fit doesn\'t work',
    },
    {
      icon: Headphones,
      title: 'Expert Support',
      description: '24/7 customer care assistance',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Delivered in 2-3 business days',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Trust Lensify?
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by 50,000+ customers across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
