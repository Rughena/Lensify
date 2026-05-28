import { LoginForm } from '@/components/auth/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      {/* Left Side — Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <span className="text-2xl font-bold">Lensify</span>
        </div>

        {/* Middle Content */}
        <div className="relative">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back!
          </h2>
          <p className="text-blue-100 text-lg mb-12">
            Sign in to access your account and continue your eyewear journey.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {[
              { icon: '👓', title: 'Virtual Try-On', desc: 'Try frames before you buy' },
              { icon: '🤖', title: 'AI Recommendations', desc: 'Get personalized frame suggestions' },
              { icon: '🚚', title: 'Fast Delivery', desc: '3-5 business days across Pakistan' },
              { icon: '↩️', title: '30-Day Returns', desc: 'Easy returns, no questions asked' },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-blue-100 text-sm">
            Premium eyewear with cutting-edge technology
          </p>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              L
            </div>
            <span className="text-xl font-bold text-gray-900">Lensify</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}