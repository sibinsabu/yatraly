'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Bus, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }).max(50, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email address format" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .max(128, { message: "Password is too long" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // UI State
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Schema Validation
    const validation = registerSchema.safeParse({ name, email, password, confirmPassword });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    try {
      setIsLoading(true);
      
      // Firebase specific account creation
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Name Profile
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      
      // Success — redirect to intended page or home
      router.push(redirectUrl || '/home');
      
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address format.');
      } else {
        setError(err.message || 'An error occurred during registration.');
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
              <Link href={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : '/login'} className="text-red-600 font-bold hover:text-red-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="font-semibold text-sm leading-relaxed">{error}</p>
            </div>
          )}

          <form className="mt-6 space-y-6" onSubmit={handleRegister}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
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
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-black bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium sm:text-sm"
                    placeholder="Repeat your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
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
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transform transition hover:-translate-y-1 disabled:opacity-75 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  Finish Registration <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-white"><div className="text-red-600 font-bold text-lg">Loading...</div></div>}>
      <RegisterContent />
    </Suspense>
  );
}
