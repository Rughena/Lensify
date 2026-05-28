import {
  Search,
  Eye,
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle2,
} from 'lucide-react';

interface OrderStep {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  tips: string[];
}

export function HowToOrderSection() {
  const orderSteps: OrderStep[] = [
    {
      icon: <Search className="w-8 h-8" />,
      number: 1,
      title: 'Browse Our Collection',
      description:
        'Explore our wide range of eyewear styles, brands, and designs. Use filters to narrow down by frame shape, color, price, and brand.',
      tips: [
        'Use frame size guide to find your size',
        'Check customer reviews for fit feedback',
        'Save your favorites with the heart icon',
      ],
    },
    {
      icon: <Eye className="w-8 h-8" />,
      number: 2,
      title: 'Choose Your Lenses',
      description:
        'Select your lens type and add any special coatings. Provide your prescription details for your glasses.',
      tips: [
        'Single Vision for simple prescriptions',
        'Progressive for multiple focal powers',
        'Blue Light blocking for screen time',
      ],
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      number: 3,
      title: 'Add to Cart',
      description:
        'Review your selection including lens options, frame size, and color. Make sure everything is correct before checkout.',
      tips: [
        'You can edit items before checkout',
        'Compare with other frames in your cart',
        'Check stock availability',
      ],
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      number: 4,
      title: 'Checkout',
      description:
        'Enter your shipping address and payment information. Choose your preferred payment method - card, UPI, or wallet.',
      tips: [
        'Free shipping on orders above Rs 2,000',
        'Apply coupon codes for discounts',
        'Get order confirmation via email',
      ],
    },
    {
      icon: <Truck className="w-8 h-8" />,
      number: 5,
      title: 'Track Your Order',
      description:
        'Your glasses will be crafted and tested before shipping. Track your delivery in real-time from our app or website.',
      tips: [
        'Typical delivery in 2-3 business days',
        'Free adjustments upon delivery',
        'SMS updates on shipment status',
      ],
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      number: 6,
      title: 'Receive & Enjoy',
      description:
        'Your glasses arrive in a premium case with cleaning cloth. Enjoy crystal-clear vision backed by our 30-day guarantee.',
      tips: [
        'Included premium case and cloth',
        'Free returns within 30 days',
        '1-year frame warranty included',
      ],
    },
  ];

  const prescriptionTips = [
    {
      title: 'Get Your Prescription',
      desc: 'Visit an optometrist to get your eye prescription. Valid prescriptions are typically 2 years old.',
    },
    {
      title: 'Understand Your Rx',
      desc: 'SPH (Sphere), CYL (Cylinder), AXIS, and ADD values. Our team can help decode your prescription.',
    },
    {
      title: 'Pupillary Distance (PD)',
      desc: 'Distance between your pupils. Your doctor can measure this, or use our PD calculator.',
    },
    {
      title: 'Progressive Addition',
      desc: 'For bifocals/progressives, specify the ADD value. We offer all types of progressives.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How to Order Your Perfect Glasses
          </h2>
          <p className="text-lg text-gray-600">
            Follow these simple steps to find and order your ideal eyewear
          </p>
        </div>

        {/* Main Steps */}
        <div className="space-y-6 mb-16">
          {orderSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-400 overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-col">
                    <span className="text-xs font-semibold">Step</span>
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-600">{step.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">{step.description}</p>

                  {/* Tips */}
                  <div className="grid md:grid-cols-3 gap-3">
                    {step.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="text-sm bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-200 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prescription Info Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Need Help with Your Prescription?
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {prescriptionTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all"
              >
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {tip.title}
                </h4>
                <p className="text-gray-700 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2-3</div>
              <p className="text-blue-100">Days Delivery</p>
            </div>
            <div className="border-l-2 border-r-2 border-blue-400 px-6">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Authentic</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30</div>
              <p className="text-blue-100">Day Money Back</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Start Shopping
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Chat with Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
