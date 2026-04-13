'use client';

import { useState } from 'react';
import { Tag, Copy, CheckCircle, Percent, Wallet, Gift, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const offers = [
  {
    id: 1,
    title: "First Ride Discount",
    description: "Get flat ₹150 off on your first bus booking with Yatraly. Unlock seamless travel experiences today.",
    code: "YATRALYNEW",
    validTill: "Valid till Dec 31, 2026",
    icon: <Gift className="w-8 h-8 text-indigo-600" />,
    gradient: "from-indigo-50 to-blue-50/40",
    border: "border-indigo-100",
    tagColor: "bg-indigo-100 text-indigo-700",
    btnHover: "hover:bg-indigo-600",
  },
  {
    id: 2,
    title: "Festive Bonanza",
    description: "Enjoy up to 20% cashback on all AC sleeper buses this festive season. No minimum booking value.",
    code: "FESTIVE20",
    validTill: "Valid till Nov 15, 2026",
    icon: <Percent className="w-8 h-8 text-rose-600" />,
    gradient: "from-rose-50 to-red-50/40",
    border: "border-rose-100",
    tagColor: "bg-rose-100 text-rose-700",
    btnHover: "hover:bg-rose-600",
  },
  {
    id: 3,
    title: "Bank Card Special",
    description: "Flat 10% instant discount using select credit cards. Grab the best seat without paying the full price.",
    code: "BANK10",
    validTill: "Valid till Oct 31, 2026",
    icon: <Wallet className="w-8 h-8 text-emerald-600" />,
    gradient: "from-emerald-50 to-teal-50/40",
    border: "border-emerald-100",
    tagColor: "bg-emerald-100 text-emerald-700",
    btnHover: "hover:bg-emerald-600",
  },
  {
    id: 4,
    title: "Weekend Getaways",
    description: "Book return tickets and get ₹300 off instantly. Only valid for trips originating on Saturdays or Sundays.",
    code: "WEEKEND300",
    validTill: "Valid on Weekends",
    icon: <Clock className="w-8 h-8 text-amber-600" />,
    gradient: "from-amber-50 to-orange-50/40",
    border: "border-amber-100",
    tagColor: "bg-amber-100 text-amber-700",
    btnHover: "hover:bg-amber-600",
  }
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
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
            <Tag className="w-4 h-4" /> Exclusive Deals
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 drop-shadow-sm">
            Unbeatable Offers & Savings
          </h1>
          <p className="text-red-100 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Save big on your next journey. Grab these limited-time deals, cashback, and instant discounts specially crafted for you.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        
        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className={`bg-gradient-to-br ${offer.gradient} rounded-3xl p-6 sm:p-8 border ${offer.border} shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group flex flex-col h-full`}
            >
              {/* Decorative background shape */}
              <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-white/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border ${offer.border}`}>
                  {offer.icon}
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${offer.tagColor}`}>
                  {offer.validTill}
                </div>
              </div>

              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{offer.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-8">
                  {offer.description}
                </p>
              </div>

              {/* Action Area */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-auto pt-6 border-t border-black/5">
                
                {/* Coupon Code Block */}
                <button 
                  onClick={() => copyToClipboard(offer.code)}
                  className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 border-2 border-dashed border-gray-300 bg-white/50 hover:bg-white px-5 py-3 rounded-xl transition-colors group/copy relative"
                >
                  <span className="font-extrabold text-gray-800 tracking-wide">{offer.code}</span>
                  {copiedCode === offer.code ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400 group-hover/copy:text-gray-700 transition-colors" />
                  )}
                  {/* Tooltip */}
                  {copiedCode === offer.code && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                      Copied!
                    </span>
                  )}
                </button>

                <Link href="/home" className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white font-bold px-6 py-3.5 rounded-xl shadow-md transition-colors ${offer.btnHover}`}>
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Newsletter / Promo Banner */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute left-0 top-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">Never miss a drop!</h2>
            <p className="text-gray-400 font-medium text-lg">
              Subscribe to our newsletter to get the latest promo codes and flash sales directly into your inbox.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto flex-shrink-0 flex items-center gap-3 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
