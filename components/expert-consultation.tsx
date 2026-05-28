import { MessageCircle, Calendar, Users, Award } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function ExpertConsultation() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Need Expert Advice?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our certified opticians are here to help you find the perfect frames and lenses for your lifestyle.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Live Chat</h3>
                  <p className="text-blue-100">Available 24/7 for instant support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Video Consultation</h3>
                  <p className="text-blue-100">Book a free 15-minute session</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Expert Recommendations</h3>
                  <p className="text-blue-100">Personalized suggestions based on your needs</p>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all">
              <Link href="/consultation" className="w-full h-full flex items-center justify-center">
                Schedule Consultation
              </Link>
            </Button>
          </div>

          {/* Right side - Stats/Features */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mb-3" />
              <p className="text-3xl font-bold text-white mb-2">500+</p>
              <p className="text-blue-100">Expert Team</p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Award className="w-8 h-8 text-purple-400 mb-3" />
              <p className="text-3xl font-bold text-white mb-2">15+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 col-span-2">
              <div className="flex gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>
              <p className="text-blue-100">
                "The experts helped me find glasses that actually fit my face shape. Amazing!"
              </p>
              <p className="text-sm text-blue-300 mt-2">- Sarah Khan, Verified Customer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
