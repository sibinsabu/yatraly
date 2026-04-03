'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Bus, Star, Wifi, Coffee, Plug, ArrowRight,
  Filter, ChevronDown, Check, Armchair
} from 'lucide-react';

// --- Dummy Data ---
const DUMMY_BUSES = [
  {
    id: 1,
    operator: 'Yatraly Premium',
    type: 'Volvo Multi-Axle A/C Sleeper (2+1)',
    rating: 4.8,
    reviews: 1240,
    departureTime: '21:30',
    arrivalTime: '06:00',
    duration: '8h 30m',
    price: 1850,
    seatsAvailable: 12,
    amenities: ['Wifi', 'Coffee', 'Plug']
  },
  {
    id: 2,
    operator: 'RedLine Express',
    type: 'Scania A/C Semi-Sleeper (2+2)',
    rating: 4.5,
    reviews: 890,
    departureTime: '22:15',
    arrivalTime: '07:15',
    duration: '9h 00m',
    price: 1200,
    seatsAvailable: 24,
    amenities: ['Coffee', 'Plug']
  },
  {
    id: 3,
    operator: 'StarBus Travels',
    type: 'Non A/C Seater (2+2)',
    rating: 3.9,
    reviews: 420,
    departureTime: '18:00',
    arrivalTime: '04:30',
    duration: '10h 30m',
    price: 850,
    seatsAvailable: 8,
    amenities: []
  },
  {
    id: 4,
    operator: 'Yatraly Standard',
    type: 'BharatBenz A/C Sleeper (2+1)',
    rating: 4.6,
    reviews: 2150,
    departureTime: '23:00',
    arrivalTime: '07:30',
    duration: '8h 30m',
    price: 1600,
    seatsAvailable: 4,
    amenities: ['Plug', 'Coffee']
  }
];

function SearchResultsContent() {
  const [buses] = useState(DUMMY_BUSES);
  const searchParams = useSearchParams();
  
  // Extract primary name from formatted city strings (e.g., "Kottayam, Kerala" -> "Kottayam")
  const rawFrom = searchParams.get('from') || 'Delhi';
  const rawTo = searchParams.get('to') || 'Mumbai';
  
  const fromCity = rawFrom.split(',')[0].trim() || 'Delhi';
  const toCity = rawTo.split(',')[0].trim() || 'Mumbai';
  
  // Format Date (e.g. 2026-10-14 -> 14 Oct 2026)
  const rawDate = searchParams.get('date');
  let formattedDate = "14 Oct 2026";
  if (rawDate) {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Search Header Banner */}
      <div className="bg-red-600 text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left truncate w-full">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3 truncate">
              <span className="truncate">{fromCity}</span> 
              <ArrowRight className="opacity-70 shrink-0" /> 
              <span className="truncate">{toCity}</span>
            </h1>
            <div className="h-6 w-px bg-red-400 hidden md:block shrink-0"></div>
            <p className="text-red-100 font-medium shrink-0">{formattedDate}</p>
          </div>
          <Link 
            href="/home" 
            className="bg-white text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition shadow-sm shrink-0"
          >
            Modify Search
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Left Sidebar - Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-28">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Filter size={20} className="text-red-600" />
                Filters
              </h2>
              <button className="text-sm font-bold text-gray-400 hover:text-red-600 transition">Reset</button>
            </div>

            <div className="space-y-6">
              {/* Bus Type */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Bus Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-red-600 transition">
                       <Check size={14} className="text-white bg-red-600 w-full h-full rounded-sm opacity-100" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-black">AC</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-red-600 transition"></div>
                    <span className="text-gray-700 font-medium group-hover:text-black">Non-AC</span>
                  </label>
                </div>
              </div>

              {/* Seating Layout */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Seating</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-red-600 transition">
                       <Check size={14} className="text-white bg-red-600 w-full h-full rounded-sm opacity-100" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-black">Sleeper</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center group-hover:border-red-600 transition"></div>
                    <span className="text-gray-700 font-medium group-hover:text-black">Seater</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Bus List */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-gray-800">{buses.length} Buses Found</h2>
            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:border-gray-300 transition block">
              <select className="appearance-none font-bold text-sm text-gray-700 bg-transparent py-2 pl-4 pr-10 cursor-pointer outline-none w-full h-full">
                <option value="price">Sort by: Price</option>
                <option value="nearest">Nearest</option>
                <option value="premium">Premium</option>
                <option value="ac">AC</option>
                <option value="non-ac">Non-AC</option>
                <option value="seater">Seater</option>
                <option value="sleeper">Sleeper</option>
                <option value="semi-sleeper">Semi Sleeper</option>
              </select>
              <div className="absolute right-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          {/* List */}
          {buses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
              
              {/* Left Segment - Info */}
              <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-extrabold text-black">{bus.operator}</h3>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                      <Star size={14} className="fill-green-700" />
                      <span className="text-sm font-bold">{bus.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium text-sm">{bus.type}</p>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between mt-8">
                  <div className="text-center md:text-left">
                    <p className="text-2xl font-extrabold text-black">{bus.departureTime}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1 w-20 truncate" title={fromCity}>{fromCity}</p>
                  </div>
                  
                  <div className="flex-1 px-4 md:px-8 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold text-gray-400 mb-1">{bus.duration}</p>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-200 absolute"></div>
                      <div className="bg-white border-2 border-gray-300 rounded-full w-3 h-3 z-10 absolute left-0"></div>
                      <Bus size={18} className="text-gray-400 z-10 bg-white px-0.5" />
                      <div className="bg-red-600 rounded-full w-3 h-3 z-10 absolute right-0 shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <p className="text-2xl font-extrabold text-black">{bus.arrivalTime}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1 text-red-600 w-20 truncate text-right" title={toCity}>{toCity}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex gap-4 mt-8">
                  {bus.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-1.5 text-gray-400" title={amenity}>
                      {amenity === 'Wifi' && <Wifi size={16} />}
                      {amenity === 'Coffee' && <Coffee size={16} />}
                      {amenity === 'Plug' && <Plug size={16} />}
                      <span className="text-xs font-semibold">{amenity}</span>
                    </div>
                  ))}
                  {bus.amenities.length === 0 && <span className="text-xs font-medium text-gray-400">Basic amenities only</span>}
                </div>
              </div>

              {/* Right Segment - Pricing & Action */}
              <div className="p-6 md:w-64 bg-gray-50 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                <p className="text-sm text-gray-500 font-medium mb-1">Starting from</p>
                <p className="text-3xl font-extrabold text-black mb-1">₹{bus.price}</p>
                <p className="text-sm font-bold text-green-600 mb-6 flex items-center gap-1">
                  <Check size={14} /> {bus.seatsAvailable} seats left
                </p>
                <Link 
                  href={{ 
                    pathname: '/seats', 
                    query: { busId: bus.id, from: rawFrom, to: rawTo, date: rawDate || '' } 
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <Armchair size={18} />
                  Select Seats
                </Link>
              </div>

            </div>
          ))}
          
        </div>

      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-red-600">Loading Buses...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
