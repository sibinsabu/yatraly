import { Search, Calendar, Clock, ShieldCheck, MapPin } from 'lucide-react';
import CitySearchBox from '@/components/CitySearchBox';

export default function HomePage() {
  return (
    <div className="flex-1 w-full relative bg-white">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-red-600 flex items-center justify-center overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-500 opacity-90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
            Your Journey <br /> Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-red-50 font-medium max-w-2xl mb-12 drop-shadow-sm">
            Book bus tickets easily, securely, and affordably with Yatraly. Over 10,000+ destinations waiting for you.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 md:p-6 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row gap-4 items-center mt-4">
            
            {/* From */}
            <CitySearchBox placeholder="Leaving from..." />

            {/* To */}
            <CitySearchBox placeholder="Going to..." isDestination={true} />

            {/* Date */}
            <div className="flex-1 w-full relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Calendar className="text-gray-400 group-focus-within:text-red-500 transition-colors" size={22} />
              </div>
              <input 
                type="date" 
                className="w-full bg-gray-50 border border-gray-200 text-black text-lg font-semibold rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
              />
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-900 transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
              <Search size={22} />
              Search
            </button>
          </div>
        </div>
        
        {/* Bottom curve decoration - keeping it clean and modern */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-0">
          <svg className="block w-full h-12 md:h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V120H1200V0C1000,100,200,100,0,0Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-black">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Why Choose <span className="text-red-600">Yatraly?</span></h2>
          <p className="text-gray-500 text-lg mb-16 max-w-2xl mx-auto font-medium">We offer the best experience for booking your tickets online.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                 <Clock size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Fast Booking</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">Book your tickets in less than 2 minutes with our streamlined checkout process.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                 <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">Secure Payments</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">Your data and transactions are protected by industry-leading security standards.</p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                 <MapPin size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black">10,000+ Routes</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">We cover all major cities and small towns to get you anywhere you need to go.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
