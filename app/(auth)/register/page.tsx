'use client';

import Link from 'next/link';
import { Bus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex bg-gray-50">
      {/* Left Design Section */}
      <div className="hidden lg:flex w-1/2 bg-red-600 flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 to-red-500 opacity-90 p-12 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-xl text-red-600 shadow-xl">
              <Bus size={32} />
            </div>
            <span className="text-3xl font-extrabold text-white tracking-tight">Yatraly</span>
          </div>
          
          <div className="my-auto max-w-lg">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Join the journey today.
            </h1>
            <p className="text-red-100 text-xl font-medium">
              Create an account to track your rides, earn rewards, and discover the best bus routes.
            </p>
          </div>
          
          <div className="text-red-100/60 font-medium">
            © {new Date().getFullYear()} Yatraly. Secure registration.
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo Block */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-red-600 p-3 rounded-xl text-white shadow-lg">
              <Bus size={28} />
            </div>
            <span className="text-3xl font-extrabold text-black tracking-tight">Yatraly</span>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-black tracking-tight">Create an account</h2>
            <p className="mt-3 text-lg text-gray-500 font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-red-600 font-bold hover:text-red-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="e.g. name@company.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>
              
              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>

            </div>

            <div className="flex items-start mt-4 mb-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-1 h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer accent-red-600"
              />
              <label htmlFor="terms" className="ml-3 block text-sm font-bold text-gray-500 cursor-pointer leading-tight">
                I agree to Yatraly's <Link href="#" className="text-red-600 hover:text-red-500">Terms of Service</Link> and <Link href="#" className="text-red-600 hover:text-red-500">Privacy Policy</Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transform transition hover:-translate-y-1"
            >
              Finish Registration <ArrowRight size={20} />
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
