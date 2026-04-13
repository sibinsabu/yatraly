'use client';

import { useState } from 'react';
import { Ticket, MapPin, Download, Ban, ArrowRight, Smartphone, Mail, ShieldCheck, Search } from 'lucide-react';

const features = [
  {
    icon: <Ban className="w-7 h-7 text-red-500" />,
    title: "Cancel Booking",
    desc: "Cancel your ticket easily and get instant refund as per the operator's policy.",
    bgColor: "bg-red-50",
    borderColor: "border-red-100"
  },
  {
    icon: <MapPin className="w-7 h-7 text-indigo-500" />,
    title: "Change Boarding",
    desc: "Update your boarding point up to 4 hours prior to departure without extra fees.",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100"
  },
  {
    icon: <Download className="w-7 h-7 text-emerald-500" />,
    title: "Download Ticket",
    desc: "Misplaced your ticket? Download a fresh PDF copy to your device instantly.",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    icon: <Smartphone className="w-7 h-7 text-blue-500" />,
    title: "Resend SMS",
    desc: "Get your m-ticket resent to your registered mobile number for easy boarding.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  }
];

export default function ManageBookingPage() {
  const [ticketNo, setTicketNo] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNo || !contact) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-red-600 pt-16 pb-36 px-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-white blur-3xl"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full text-white font-bold text-sm mb-6 shadow-sm border border-white/20 backdrop-blur-md">
            <Ticket className="w-4 h-4" /> Booking Portal
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 drop-shadow-sm">
            Manage Your Booking
          </h1>
          <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            View, cancel, or modify your itinerary. Enter your ticket details below to access your trip dashboard.
          </p>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 backdrop-blur-xl mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* Ticket Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">
                Ticket Number / PNR
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Ticket className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={ticketNo}
                  onChange={(e) => setTicketNo(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-0 outline-none transition-all font-medium text-lg shadow-sm"
                  placeholder="e.g. YT12345678"
                />
              </div>
            </div>

            {/* Email/Phone Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 ml-1">
                Email / Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-0 outline-none transition-all font-medium text-lg shadow-sm"
                  placeholder="Enter registered contact"
                />
              </div>
            </div>
            
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-80 scale-95' : 'hover:bg-black hover:shadow-xl hover:-translate-y-1'}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Searching...
              </span>
            ) : (
              <>
                <Search className="w-5 h-5" /> Let's Go
              </>
            )}
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            Your data is securely encrypted.
          </div>
        </form>

        {/* Feature Highlights Area */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left">What can I do here?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-xl hover:border-red-100 transition-all duration-300 group flex items-start gap-5"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-110 ${feature.bgColor} ${feature.borderColor}`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
