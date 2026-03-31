'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bus, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI State
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Schema Validation
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);
      
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      
      // Success, route to home
      router.push('/home');
      
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              Welcome back to your journey.
            </h1>
            <p className="text-red-100 text-xl font-medium">
              Log in to manage your bookings, discover new routes, and explore exclusive offers.
            </p>
          </div>
          
          <div className="text-red-100/60 font-medium">
            © {new Date().getFullYear()} Yatraly. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo Block - Only visible on small screens where left side is hidden */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div className="bg-red-600 p-3 rounded-xl text-white shadow-lg">
              <Bus size={28} />
            </div>
            <span className="text-3xl font-extrabold text-red-600 tracking-tight">Yatraly</span>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-black tracking-tight">Sign in to your account</h2>
            <p className="mt-3 text-lg text-gray-500 font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="text-red-600 font-bold hover:text-red-500 transition-colors">
                Sign up instead
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="font-semibold text-sm leading-relaxed">{error}</p>
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700 block">Password</label>
                  <Link href="#" className="text-sm font-bold text-red-600 hover:text-red-500 transition">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer accent-red-600"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm font-bold text-gray-700 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transform transition hover:-translate-y-1 disabled:opacity-75 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}
