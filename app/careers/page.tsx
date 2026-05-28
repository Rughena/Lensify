'use client';

import { Footer } from '@/components/footer';
import { Briefcase } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    { title: 'Product Manager', location: 'New York', type: 'Full-time' },
    { title: 'UX/UI Designer', location: 'Remote', type: 'Full-time' },
    { title: 'Backend Developer', location: 'San Francisco', type: 'Full-time' },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Careers at Lensify</h1>
            <p className="text-blue-100">Join our team and help revolutionize eyewear shopping</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, idx) => (
                <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.location} • {job.type}</p>
                    </div>
                    <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-50 rounded-xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Join Lensify?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Competitive salary and benefits</li>
              <li>✓ Flexible work arrangements</li>
              <li>✓ Professional development opportunities</li>
              <li>✓ Collaborative and innovative team culture</li>
              <li>✓ Impact on millions of customers</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
