'use client';

import { useState, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Bus, ArrowRight, ArrowLeft, Star, Clock, MapPin,
  Wifi, Coffee, Plug, X, Check, AlertCircle, Armchair
} from 'lucide-react';

// ─── Seat type definitions ───
type SeatStatus = 'available' | 'booked' | 'selected' | 'ladies';
type DeckType = 'lower' | 'upper';

interface Seat {
  id: string;
  row: number;
  col: number;
  status: SeatStatus;
  price: number;
  label: string;
  isSleeper?: boolean;
}

// ─── Bus data lookup (mirrors search page dummy data) ───
const BUS_DATA: Record<string, {
  operator: string; type: string; rating: number; reviews: number;
  departureTime: string; arrivalTime: string; duration: string;
  price: number; amenities: string[];
}> = {
  '1': { operator: 'Yatraly Premium', type: 'Volvo Multi-Axle A/C Sleeper (2+1)', rating: 4.8, reviews: 1240, departureTime: '21:30', arrivalTime: '06:00', duration: '8h 30m', price: 1850, amenities: ['Wifi', 'Coffee', 'Plug'] },
  '2': { operator: 'RedLine Express', type: 'Scania A/C Semi-Sleeper (2+2)', rating: 4.5, reviews: 890, departureTime: '22:15', arrivalTime: '07:15', duration: '9h 00m', price: 1200, amenities: ['Coffee', 'Plug'] },
  '3': { operator: 'StarBus Travels', type: 'Non A/C Seater (2+2)', rating: 3.9, reviews: 420, departureTime: '18:00', arrivalTime: '04:30', duration: '10h 30m', price: 850, amenities: [] },
  '4': { operator: 'Yatraly Standard', type: 'BharatBenz A/C Sleeper (2+1)', rating: 4.6, reviews: 2150, departureTime: '23:00', arrivalTime: '07:30', duration: '8h 30m', price: 1600, amenities: ['Plug', 'Coffee'] },
};

// ─── Generate seat layout ───
function generateSeats(busId: string, deck: DeckType): Seat[] {
  const bus = BUS_DATA[busId];
  if (!bus) return [];

  const isSleeper = bus.type.toLowerCase().includes('sleeper');
  const is2plus1 = bus.type.includes('2+1');
  const rows = isSleeper ? 8 : 10;
  const cols = is2plus1 ? 3 : 4; // 2+1 or 2+2

  const seats: Seat[] = [];
  const bookedPattern = [2, 5, 7, 11, 14, 18, 22, 25, 28]; // deterministic "booked" seats
  const ladiesPattern = [3, 4, 12, 13]; // ladies-only seats

  let seatNum = deck === 'upper' ? 100 : 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      seatNum++;
      const seatId = `${deck[0].toUpperCase()}${seatNum}`;
      
      let status: SeatStatus = 'available';
      if (bookedPattern.includes(seatNum % 32)) status = 'booked';
      else if (ladiesPattern.includes(seatNum % 32)) status = 'ladies';

      seats.push({
        id: seatId,
        row,
        col,
        status,
        price: bus.price + (deck === 'upper' ? 200 : 0) + (col === (cols - 1) && is2plus1 ? 300 : 0),
        label: seatId,
        isSleeper,
      });
    }
  }
  return seats;
}

// ─── Seat Component ───
function SeatButton({ seat, onToggle }: { seat: Seat; onToggle: (id: string) => void }) {
  const base = 'relative flex items-center justify-center font-bold text-xs rounded-lg border-2 transition-all duration-200 cursor-pointer select-none';
  const sizeClass = seat.isSleeper
    ? 'w-16 h-10 sm:w-20 sm:h-12'
    : 'w-10 h-10 sm:w-12 sm:h-12';

  let stateClass = '';
  let hoverClass = '';
  let disabled = false;

  switch (seat.status) {
    case 'available':
      stateClass = 'bg-white border-gray-300 text-gray-700';
      hoverClass = 'hover:border-red-500 hover:bg-red-50 hover:text-red-600 hover:shadow-md hover:-translate-y-0.5';
      break;
    case 'selected':
      stateClass = 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-200 scale-105';
      hoverClass = 'hover:bg-red-700 hover:border-red-700';
      break;
    case 'booked':
      stateClass = 'bg-gray-200 border-gray-200 text-gray-400';
      disabled = true;
      break;
    case 'ladies':
      stateClass = 'bg-pink-50 border-pink-300 text-pink-600';
      hoverClass = 'hover:border-pink-500 hover:bg-pink-100 hover:shadow-md hover:-translate-y-0.5';
      break;
  }

  return (
    <button
      className={`${base} ${sizeClass} ${stateClass} ${disabled ? 'cursor-not-allowed opacity-60' : hoverClass}`}
      disabled={disabled}
      onClick={() => !disabled && onToggle(seat.id)}
      title={disabled ? 'Already booked' : `Seat ${seat.label} — ₹${seat.price}`}
      aria-label={`Seat ${seat.label}, ${seat.status}, ₹${seat.price}`}
    >
      {seat.label}
    </button>
  );
}

// ─── Main Content ───
function SeatSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const busId = searchParams.get('busId') || '1';
  const fromCity = (searchParams.get('from') || 'Delhi').split(',')[0].trim();
  const toCity = (searchParams.get('to') || 'Mumbai').split(',')[0].trim();
  const rawDate = searchParams.get('date');

  const bus = BUS_DATA[busId];
  const isSleeper = bus ? bus.type.toLowerCase().includes('sleeper') : false;

  const [activeDeck, setActiveDeck] = useState<DeckType>('lower');
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  // Generate seats for each deck (memoized)
  const lowerSeats = useMemo(() => generateSeats(busId, 'lower'), [busId]);
  const upperSeats = useMemo(() => generateSeats(busId, 'upper'), [busId]);
  const currentSeats = activeDeck === 'lower' ? lowerSeats : upperSeats;

  // Group by rows for rendering
  const is2plus1 = bus?.type.includes('2+1');
  const cols = is2plus1 ? 3 : 4;

  const seatRows = useMemo(() => {
    const rows: Seat[][] = [];
    for (let i = 0; i < currentSeats.length; i += cols) {
      rows.push(currentSeats.slice(i, i + cols));
    }
    return rows;
  }, [currentSeats, cols]);

  const formattedDate = useMemo(() => {
    if (!rawDate) return '14 Oct 2026';
    const d = new Date(rawDate);
    return isNaN(d.getTime()) ? '14 Oct 2026' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [rawDate]);

  // Toggle a seat
  const toggleSeat = (seatId: string) => {
    setSelectedSeats(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        if (next.size >= 6) return prev; // max 6 seats
        next.add(seatId);
      }
      return next;
    });
  };

  // Compute pricing
  const allSeats = [...lowerSeats, ...upperSeats];
  const selectedSeatDetails = allSeats
    .filter(s => selectedSeats.has(s.id))
    .map(s => ({ ...s, status: 'selected' as SeatStatus }));
  const subtotal = selectedSeatDetails.reduce((sum, s) => sum + s.price, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  // Build display seats with selected status injected
  const displaySeats = currentSeats.map(s => ({
    ...s,
    status: selectedSeats.has(s.id) ? 'selected' as SeatStatus : s.status,
  }));

  const displayRows = useMemo(() => {
    const rows: (typeof displaySeats)[] = [];
    for (let i = 0; i < displaySeats.length; i += cols) {
      rows.push(displaySeats.slice(i, i + cols));
    }
    return rows;
  }, [displaySeats, cols]);

  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-black mb-2">Bus not found</h2>
          <Link href="/home" className="text-red-600 font-bold hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <div className="bg-red-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                <span className="truncate">{fromCity}</span>
                <ArrowRight className="opacity-70 shrink-0" size={18} />
                <span className="truncate">{toCity}</span>
              </h1>
              <p className="text-red-100 text-sm font-medium">{formattedDate} • {bus.operator}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg">
              <Star size={14} className="fill-white" />
              <span className="font-bold text-sm">{bus.rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg">
              <Clock size={14} />
              <span className="font-bold text-sm">{bus.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ═══ LEFT: Bus Seat Layout ═══ */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

              {/* Bus Type & Amenities Bar */}
              <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-black">{bus.operator}</h2>
                  <p className="text-sm text-gray-500 font-medium">{bus.type}</p>
                </div>
                <div className="flex gap-4">
                  {bus.amenities.map(a => (
                    <div key={a} className="flex items-center gap-1.5 text-gray-400" title={a}>
                      {a === 'Wifi' && <Wifi size={16} />}
                      {a === 'Coffee' && <Coffee size={16} />}
                      {a === 'Plug' && <Plug size={16} />}
                      <span className="text-xs font-semibold">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deck Tabs (only for sleeper buses) */}
              {isSleeper && (
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setActiveDeck('lower')}
                    className={`flex-1 py-3.5 text-center font-bold text-sm transition ${
                      activeDeck === 'lower'
                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Lower Deck
                  </button>
                  <button
                    onClick={() => setActiveDeck('upper')}
                    className={`flex-1 py-3.5 text-center font-bold text-sm transition ${
                      activeDeck === 'upper'
                        ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Upper Deck
                  </button>
                </div>
              )}

              {/* Legend */}
              <div className="px-5 pt-5 pb-3 flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white"></div>
                  <span className="text-xs font-semibold text-gray-500">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-red-600 bg-red-600"></div>
                  <span className="text-xs font-semibold text-gray-500">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-200 bg-gray-200"></div>
                  <span className="text-xs font-semibold text-gray-500">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-pink-300 bg-pink-50"></div>
                  <span className="text-xs font-semibold text-gray-500">Ladies</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="p-5 pt-2">
                {/* Driver / Front indicator */}
                <div className="flex items-center justify-end mb-6 pr-2">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <Armchair size={16} className="text-gray-500" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Driver</span>
                  </div>
                </div>

                {/* The Bus Body */}
                <div className="border-2 border-gray-200 rounded-2xl p-4 sm:p-6 bg-gradient-to-b from-gray-50/50 to-white">
                  <div className="flex flex-col gap-3">
                    {displayRows.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex items-center justify-center gap-2 sm:gap-3">
                        {/* Left seats (first 2) */}
                        <div className="flex gap-2 sm:gap-3">
                          {row.slice(0, 2).map(seat => (
                            <SeatButton key={seat.id} seat={seat} onToggle={toggleSeat} />
                          ))}
                        </div>

                        {/* Aisle */}
                        <div className={`${isSleeper ? 'w-6 sm:w-10' : 'w-4 sm:w-8'} flex-shrink-0`}></div>

                        {/* Right seats (rest) */}
                        <div className="flex gap-2 sm:gap-3">
                          {row.slice(2).map(seat => (
                            <SeatButton key={seat.id} seat={seat} onToggle={toggleSeat} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Max seats notice */}
                <p className="text-center text-xs text-gray-400 font-medium mt-4">
                  You can select up to 6 seats at a time
                </p>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT: Trip Summary & Pricing ═══ */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden sticky top-28">

              {/* Trip Info */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-extrabold text-black mb-4">Trip Summary</h3>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-black">{bus.departureTime}</p>
                    <p className="text-sm text-gray-500 font-medium mt-1">{fromCity}</p>
                  </div>
                  <div className="flex-1 px-4 flex flex-col items-center">
                    <p className="text-xs font-bold text-gray-400 mb-1">{bus.duration}</p>
                    <div className="w-full relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gray-200 absolute"></div>
                      <div className="bg-white border-2 border-gray-300 rounded-full w-2.5 h-2.5 z-10 absolute left-0"></div>
                      <Bus size={14} className="text-gray-400 z-10 bg-white px-0.5" />
                      <div className="bg-red-600 rounded-full w-2.5 h-2.5 z-10 absolute right-0 shadow-[0_0_6px_rgba(220,38,38,0.4)]"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-black">{bus.arrivalTime}</p>
                    <p className="text-sm text-red-600 font-medium mt-1">{toCity}</p>
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400 font-medium mt-3">{formattedDate}</p>
              </div>

              {/* Selected Seats */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-700 mb-3">
                  Selected Seats ({selectedSeatDetails.length})
                </h4>
                {selectedSeatDetails.length === 0 ? (
                  <div className="text-center py-6">
                    <Armchair size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400 font-medium">
                      Click on a seat to select it
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedSeatDetails.map(seat => (
                      <div
                        key={seat.id}
                        className="flex items-center justify-between bg-red-50 rounded-xl px-4 py-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                            {seat.label}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-black">Seat {seat.label}</p>
                            <p className="text-xs text-gray-500 font-medium">
                              {seat.id.startsWith('U') ? 'Upper' : 'Lower'} Deck
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-black">₹{seat.price}</span>
                          <button
                            onClick={() => toggleSeat(seat.id)}
                            className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-200"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              {selectedSeatDetails.length > 0 && (
                <div className="p-6 border-b border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Subtotal ({selectedSeatDetails.length} seat{selectedSeatDetails.length > 1 ? 's' : ''})</span>
                    <span className="text-black font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">GST (5%)</span>
                    <span className="text-black font-bold">₹{tax}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="text-black font-extrabold text-lg">Total</span>
                    <span className="text-red-600 font-extrabold text-lg">₹{total}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-6">
                <button
                  disabled={selectedSeatDetails.length === 0}
                  className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg text-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-1 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {selectedSeatDetails.length === 0 ? (
                    'Select seats to continue'
                  ) : (
                    <>
                      Proceed to Pay ₹{total} <ArrowRight size={20} />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 font-medium mt-3 flex items-center justify-center gap-1">
                  <Check size={12} className="text-green-500" />
                  100% Secure checkout
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SeatSelectionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold text-red-600 text-lg">Loading Seat Map...</span>
        </div>
      </div>
    }>
      <SeatSelectionContent />
    </Suspense>
  );
}
