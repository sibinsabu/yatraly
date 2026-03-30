'use client';

import Link from 'next/link';
import { Bus, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg text-white shadow-md">
              <Bus size={26} />
            </div>
            <Link href="/home" className="text-2xl font-extrabold tracking-tight text-red-600">
              Yatraly
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-black font-semibold hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/offers" className="text-black font-semibold hover:text-red-600 transition-colors">
              Offers
            </Link>
            <Link href="/manage" className="text-black font-semibold hover:text-red-600 transition-colors">
              Manage Booking
            </Link>
            <Link href="/help" className="text-black font-semibold hover:text-red-600 transition-colors">
              Help Support
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-5">
            <button className="flex items-center gap-2 text-black font-medium hover:text-red-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
              <Search size={22} className="text-black hover:text-red-600"/>
            </button>
            <Link href="/login" className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-red-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <User size={20} />
              <span>Login / Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-red-600 p-2 rounded-md hover:bg-gray-50 transition-colors outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/home" className="block px-3 py-2.5 rounded-md text-base font-semibold text-black hover:text-red-600 hover:bg-red-50">
              Home
            </Link>
            <Link href="/offers" className="block px-3 py-2.5 rounded-md text-base font-semibold text-black hover:text-red-600 hover:bg-red-50">
              Offers
            </Link>
            <Link href="/manage" className="block px-3 py-2.5 rounded-md text-base font-semibold text-black hover:text-red-600 hover:bg-red-50">
              Manage Booking
            </Link>
            <Link href="/help" className="block px-3 py-2.5 rounded-md text-base font-semibold text-black hover:text-red-600 hover:bg-red-50">
              Help Support
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full border border-gray-200 text-black bg-gray-50 px-4 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                 <Search size={18} />
                 Search Buses
              </button>
              <Link href="/login" className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-3 rounded-md font-bold hover:bg-red-700 shadow-md transition">
                <User size={20} />
                Login / Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
