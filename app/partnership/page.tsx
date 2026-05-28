'use client';

import { Footer } from '@/components/footer';
import { Handshake, TrendingUp, Users, Globe } from 'lucide-react';

export default function PartnershipPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Together',
      description: 'Expand your market reach and boost sales through our established customer base.',
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Our partnership team provides ongoing support and resources for your success.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to our international network and distribution channels.',
    },
    {
      icon: Handshake,
      title: 'Mutual Growth',
      description: 'Collaborate on innovative products and exclusive collections with Lensify.',
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Handshake className="w-10 h-10" />
              <h1 className="text-4xl sm:text-5xl font-bold">Partnership Opportunities</h1>
            </div>
            <p className="text-lg sm:text-xl text-blue-100">Join forces with Lensify to revolutionize the eyewear industry</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Introduction */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Partner with Lensify?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Lensify is a leading innovator in the eyewear industry, combining cutting-edge technology with fashion-forward design. We're looking for strategic partners who share our vision of making quality eyewear accessible to everyone.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're a brand, supplier, influencer, or retailer, we have partnership opportunities tailored to your needs and expertise.
            </p>
          </section>

          {/* Benefits Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Partnership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Types of Partnerships */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Partnership Types</h2>
            <div className="space-y-6">
              <div className="p-6 border-l-4 border-blue-600 bg-blue-50 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Partnerships</h3>
                <p className="text-gray-700">
                  Collaborate with premium eyewear brands to create exclusive collections and limited-edition designs. We handle distribution, marketing, and customer service while you focus on design excellence.
                </p>
              </div>

              <div className="p-6 border-l-4 border-purple-600 bg-purple-50 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Supplier Partnerships</h3>
                <p className="text-gray-700">
                  Are you a manufacturer or supplier? We're always looking for reliable partners who can provide quality materials and products at competitive prices. Become part of our supply chain network.
                </p>
              </div>

              <div className="p-6 border-l-4 border-indigo-600 bg-indigo-50 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Influencer & Affiliate Programs</h3>
                <p className="text-gray-700">
                  Earn competitive commissions by promoting Lensify to your audience. We provide marketing materials, personalized tracking links, and dedicated support for our influencer partners.
                </p>
              </div>

              <div className="p-6 border-l-4 border-blue-400 bg-blue-50/50 rounded">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Retail & Distribution Partnerships</h3>
                <p className="text-gray-700">
                  Interested in carrying Lensify products in your retail location or distribution network? We offer attractive wholesale terms and comprehensive support for retail partners.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Get in touch with our partnership team to explore opportunities tailored to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:partnerships@lensify.com"
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Email Us
              </a>
              <a
                href="/contact-us"
                className="px-8 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors border border-white/50"
              >
                Contact Form
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
