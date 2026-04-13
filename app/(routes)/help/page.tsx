'use client';

import { useState } from 'react';
import { Search, ChevronDown, Ticket, CreditCard, RotateCcw, AlertCircle, Phone, Mail, MessageSquare, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "How do I cancel my bus ticket?",
    answer: "You can cancel your ticket by logging into your account, navigating to 'Manage Booking', selecting your trip, and clicking on the 'Cancel' button. Please note that cancellation charges may apply based on the operator's policy."
  },
  {
    question: "What is the refund policy?",
    answer: "Refunds are processed automatically upon successful cancellation and usually reflect in your original payment method within 5-7 business days."
  },
  {
    question: "Can I change my boarding point?",
    answer: "Yes, you can change your boarding point up to 4 hours before the departure time by calling our support line or doing it directly via the 'Manage Booking' section if allowed by the bus operator."
  },
  {
    question: "Do I need to carry a physical printout of my ticket?",
    answer: "No, an SMS/Email confirmation or the m-ticket on the Yatraly app is sufficient for boarding. However, you must carry a valid government-issued ID for identity verification."
  }
];

const topics = [
  { icon: <Ticket className="text-red-500 w-8 h-8" />, title: "Booking Issues", desc: "Troubleshoot ticket booking" },
  { icon: <CreditCard className="text-red-500 w-8 h-8" />, title: "Payments", desc: "Payment methods & failures" },
  { icon: <RotateCcw className="text-red-500 w-8 h-8" />, title: "Cancellations", desc: "Refunds and policies" },
  { icon: <AlertCircle className="text-red-500 w-8 h-8" />, title: "Safety Rules", desc: "Travel guidelines & policies" },
];

export default function HelpSupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-red-600 pt-16 pb-32 px-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-white blur-3xl"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            How can we help?
          </h1>
          <p className="text-red-100 text-lg md:text-xl mb-8 font-medium">
            Find answers, troubleshoot issues, or get in touch with our team.
          </p>
          
          <div className="relative max-w-2xl mx-auto group">
            {/* Soft glowing background effect */}
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="relative flex items-center bg-white rounded-full shadow-2xl p-2 ring-1 ring-black/5 focus-within:ring-4 focus-within:ring-white/40 transition-all">
              <div className="pl-5 pr-3 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for articles, questions, or keywords..."
                className="block w-full bg-transparent border-0 text-lg text-gray-900 placeholder-gray-400 focus:ring-0 outline-none pr-4 py-3"
              />
              <button className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg transform active:scale-95 flex-shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {topics.map((topic, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer group flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-red-100">
                {topic.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-6 border-b border-gray-100 sm:p-10 shadow-xl shadow-gray-200/50 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 sm:mb-10 text-center sm:text-left">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${activeFaq === index ? 'border-red-600 bg-red-50/30' : 'border-gray-100 hover:border-red-200'}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`text-lg font-bold pr-4 transition-colors ${activeFaq === index ? 'text-red-700' : 'text-gray-900 group-hover:text-red-600'}`}>
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-red-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-red-500 transition-colors" />
                  )}
                </button>
                <div 
                  className={`px-6 pb-6 text-gray-600 text-[1.05rem] leading-relaxed border-t border-red-100/50 pt-4 mx-6 ${activeFaq === index ? 'block' : 'hidden'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still need help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-blue-100">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">24/7 Telephone Support</p>
              <a href="tel:+1234567890" className="inline-block text-blue-600 font-bold hover:text-blue-700 px-6 py-2.5 bg-blue-50 rounded-full transition-colors w-full">
                1-800-123-4567
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl border border-gray-100 hover:border-red-200 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-red-100">
                <Mail className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">Get response within 2 hours</p>
              <a href="mailto:support@yatraly.com" className="inline-block text-red-600 font-bold hover:text-red-700 px-6 py-2.5 bg-red-50 rounded-full transition-colors w-full">
                support@yatraly.com
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-green-100">
                <MessageSquare className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-500 mb-6 text-sm font-medium">Chat with our executives</p>
              <button className="inline-block text-green-600 font-bold hover:text-green-700 px-6 py-2.5 bg-green-50 rounded-full transition-colors w-full">
                Start Chatting
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
