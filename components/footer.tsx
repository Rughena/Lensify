'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Stay Updated</h3>
              <p className="text-blue-100">Subscribe to get exclusive offers and eyewear tips delivered to your inbox</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button 
                type="submit"
                className="px-6 sm:px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap text-sm sm:text-base active:scale-95"
              >
                {subscribed ? '✓ Done' : 'Subscribe'}
              </button>
            </form>
            {subscribed && (
              <p className="col-span-1 md:col-span-2 text-green-200 text-sm mt-2">Thank you for subscribing! Check your email for exclusive offers.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="text-xl font-bold text-white">Lensify</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Premium eyewear with cutting-edge technology, virtual try-on, and expert support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-blue-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-blue-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=men" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Men's Frames
                </Link>
              </li>
              <li>
                <Link href="/shop?category=women" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Women's Frames
                </Link>
              </li>
              <li>
                <Link href="/shop?category=unisex" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Unisex
                </Link>
              </li>
              <li>
                <Link href="/try-on" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Virtual Try-On
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Partnership
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Plot 42, Main Boulevard, Gulberg III, Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+18005551234" className="text-gray-400 hover:text-blue-400 transition-colors">
                  +92 (42) 111-536-743
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:support@lensify.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  support@lensify.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Trust Badges */}
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <div className="text-2xl mb-1">🔒</div>
                <p className="text-xs text-gray-500">Secure Checkout</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">✈️</div>
                <p className="text-xs text-gray-500">Fast Shipping</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">↩️</div>
                <p className="text-xs text-gray-500">Easy Returns</p>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">Accepted:</span>
              <span className="text-xs text-gray-400">💳 Visa</span>
              <span className="text-xs text-gray-400">💳 Mastercard</span>
              <span className="text-xs text-gray-400">💳 UPI</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
            <p>&copy; {currentYear} Lensify. All rights reserved. Designed with ❤️ for eyewear lovers.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
