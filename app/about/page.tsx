'use client';

import { Footer } from '@/components/footer';
import { Users, Target, Heart, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Lensify</h1>
            <p className="text-lg sm:text-xl text-blue-100">Revolutionizing eyewear shopping with technology and expertise</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Lensify, we believe everyone deserves access to premium eyewear that combines style, quality, and affordability. Our mission is to make eyewear shopping convenient, engaging, and personalized through cutting-edge technology and expert guidance.
            </p>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-gray-900">Quality First</h3>
                <p className="text-gray-700">We only stock 100% authentic, premium eyewear from trusted brands.</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <Heart className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-gray-900">Customer Care</h3>
                <p className="text-gray-700">Your satisfaction is our priority. Our expert team is available 24/7.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <Sparkles className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-gray-900">Innovation</h3>
                <p className="text-gray-700">We leverage AI and AR technology to enhance your shopping experience.</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <Users className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-gray-900">Community</h3>
                <p className="text-gray-700">We're building a community of eyewear enthusiasts and style lovers.</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 mb-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-blue-100">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-blue-100">Premium Brands</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100K+</div>
                <p className="text-blue-100">Products Sold</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <p className="text-blue-100">Years Experience</p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our team consists of eyewear experts, fashion consultants, and tech enthusiasts dedicated to providing you with the best shopping experience. With over 15 years of combined experience in the eyewear industry, we're passionate about helping you find the perfect frames.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
