import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Prescription',
    question: 'Do I need a prescription to order glasses?',
    answer:
      'Yes, we require a valid prescription for all eyeglasses. Your prescription must be current (usually valid for 2 years). You can get one from any eye care professional (optometrist or ophthalmologist).',
  },
  {
    id: '2',
    category: 'Prescription',
    question: 'How do I read my prescription?',
    answer:
      'Your prescription includes SPH (sphere), CYL (cylinder), AXIS, and ADD values. SPH is for nearsightedness/farsightedness, CYL and AXIS for astigmatism, and ADD for bifocals/progressives.',
  },
  {
    id: '3',
    category: 'Sizing',
    question: 'How do I know what frame size to order?',
    answer:
      'Look at the inside of your current glasses for three numbers (e.g., 54-17-140). The first number is the lens width in mm. Most people wear 48-56mm frames. Use our frame size guide for recommendations based on your face shape.',
  },
  {
    id: '4',
    category: 'Sizing',
    question: 'Can I return glasses if they don\'t fit?',
    answer:
      'Yes! We offer free exchanges for 30 days if the fit isn\'t right. Just contact our customer service with your order details and we\'ll arrange a free replacement.',
  },
  {
    id: '5',
    category: 'Lenses',
    question: 'What\'s the difference between single vision and progressive lenses?',
    answer:
      'Single vision has one focal power throughout the lens. Progressive lenses have multiple powers (distance, intermediate, and near) with a smooth transition. Progressives are ideal for presbyopia (difficulty focusing on close objects).',
  },
  {
    id: '6',
    category: 'Lenses',
    question: 'Do you offer blue light blocking lenses?',
    answer:
      'Yes! Blue light blocking lenses reduce digital eye strain from screens. They\'re available for all frame options at an additional cost of Rs 35. Great for people who spend lots of time on computers or phones.',
  },
  {
    id: '7',
    category: 'Delivery',
    question: 'How long does delivery take?',
    answer:
      'We deliver to most areas within 2-3 business days. Free shipping on orders above Rs 2,000. You can track your order in real-time from our app or website.',
  },
  {
    id: '8',
    category: 'Quality',
    question: 'Are your glasses authentic?',
    answer:
      'Absolutely! All our glasses are 100% authentic from authorized distributors. We guarantee authenticity or offer a full refund. Each product comes with a certificate of authenticity.',
  },
];

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(faqData.map((item) => item.category))];

  const filteredFAQ =
    selectedCategory === 'all'
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our eyewear
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFAQ.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 transition-colors overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === item.id ? null : item.id)
                }
                className="w-full flex items-start justify-between p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors text-left"
              >
                <span className="font-bold text-gray-900 flex-1 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-4">Our expert team is here to help 24/7</p>
          <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
