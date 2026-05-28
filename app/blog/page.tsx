'use client';

import { Footer } from '@/components/footer';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'How to Choose the Perfect Frame for Your Face Shape',
      excerpt: 'Learn which frame styles complement different face shapes and how to find your perfect fit.',
      date: 'Nov 28, 2025',
      category: 'Fashion',
    },
    {
      title: 'The Ultimate Guide to Prescription Glasses',
      excerpt: 'Everything you need to know about prescription eyewear, from understanding your Rx to choosing lenses.',
      date: 'Nov 25, 2025',
      category: 'Education',
    },
    {
      title: 'Trending Eyewear Styles for 2025',
      excerpt: 'Discover the hottest eyewear trends this season and how to style them for any occasion.',
      date: 'Nov 22, 2025',
      category: 'Trends',
    },
    {
      title: 'Caring for Your Eyewear: Tips and Tricks',
      excerpt: 'Maximize the lifespan of your glasses with our comprehensive care guide.',
      date: 'Nov 20, 2025',
      category: 'Care',
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Lensify Blog</h1>
            <p className="text-blue-100">Tips, trends, and eyewear insights</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-6">
            {posts.map((post, idx) => (
              <article
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">
                  Read More →
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
