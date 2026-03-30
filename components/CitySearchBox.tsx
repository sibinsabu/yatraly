'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface CitySearchBoxProps {
  placeholder: string;
  isDestination?: boolean;
}

interface PlaceResult {
  place_id: number;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
}

export default function CitySearchBox({ placeholder, isDestination = false }: CitySearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Debounced API call to OpenStreetMap Nominatim
  useEffect(() => {
    const fetchPlaces = async () => {
      if (!query || query.length < 3) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&countrycodes=in&format=json&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      // Only fetch if query has changed from the selected city meaning it's an active search
      if (query !== selectedCity) {
        fetchPlaces();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, selectedCity]);

  // Helper to format the display name better
  const formatPlaceName = (place: PlaceResult) => {
    // Extract the primary name (e.g. Village Name) and the State
    const primaryName = place.address?.city || place.address?.town || place.address?.village || place.display_name.split(',')[0];
    const state = place.address?.state || "";
    return state ? `${primaryName}, ${state}` : primaryName;
  };

  return (
    <div className="flex-1 w-full relative group" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <MapPin className={`transition-colors ${isDestination ? "text-red-500" : "text-gray-400 group-focus-within:text-red-500"}`} size={22} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        value={selectedCity || query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (selectedCity) setSelectedCity('');
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
        }}
        className="w-full bg-gray-50 border border-gray-200 text-black text-lg font-semibold rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
      />
      
      {/* Loading Spinner inside input */}
      {isLoading && (
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <Loader2 className="animate-spin text-red-500" size={20} />
        </div>
      )}
      
      {/* Search Dropdown */}
      {isOpen && query.length >= 3 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-72 overflow-y-auto top-full left-0">
          {isLoading ? (
            <div className="p-4 text-gray-500 font-medium text-center flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Searching places...
            </div>
          ) : results.length > 0 ? (
            <ul className="py-2">
              {results.map((place) => {
                const formattedName = formatPlaceName(place);
                return (
                  <li 
                    key={place.place_id}
                    onClick={() => {
                      setSelectedCity(formattedName);
                      setQuery(''); // Reset query so input shows selectedCity
                      setIsOpen(false);
                    }}
                    className="flex flex-col gap-1 px-4 py-3 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-gray-400 shrink-0" />
                      <span className="text-gray-900 font-bold truncate">{formattedName}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium pl-7 truncate" title={place.display_name}>
                      {place.display_name}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-gray-500 font-medium text-center">No places found in India</div>
          )}
        </div>
      )}
      
      {/* Prompt to type 3 characters */}
      {isOpen && query.length > 0 && query.length < 3 && !selectedCity && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl top-full left-0 p-4 text-gray-500 font-medium text-center">
          Type at least 3 characters to search...
        </div>
      )}
    </div>
  );
}
