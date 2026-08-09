'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// ডেমো প্রোডাক্ট ডাটাবেস (আপনার প্রজেক্টের ডাটা অনুযায়ী এখানে প্রোডাক্ট যুক্ত করবেন)
const allProductsDatabase = [
  { id: 1, name: 'UGREEN 10M USB PRINTER CABLE (10374)', price: 1650, image: '/images/products/cable.png' },
  { id: 2, name: 'UGREEN 2PORT HDMI SWITCHER / SPLITTER 50966 BLACK', price: 1150, image: '/images/products/docking-station.png' },
  { id: 3, name: 'UGREEN 4K MINI HDMI TO HDMI CONVERTER (20137)', price: 750, image: '/images/products/cable.png' },
  { id: 4, name: 'UGREEN 12W 2A POWER ADAPTER CD264(20359)', price: 950, image: '/images/products/charger-1.png' },
  { id: 5, name: 'UGREEN REVODOK MAX 213 THUNDERBOLT 4 13 IN 1 DOCKING STATION (25054)', price: 29500, image: '/images/products/docking-station.png' },
  { id: 6, name: 'HOCO UA18 USB Wireless BT 5.0 Adapter', price: 300, image: '/images/products/cable.png' },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ফিল্টার করা প্রোডাক্ট লিস্ট
  const filteredProducts = searchQuery.trim() === '' ? [] : allProductsDatabase.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হয়ে যাবে
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 md:mx-4">
      
      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search"
          className="w-full h-11 bg-white text-gray-800 placeholder-gray-400 placeholder:text-[15px] px-4 pr-10 rounded-md outline-none focus:ring-2 focus:ring-orange-500 text-sm font-normal shadow-sm"
        />
        <button 
          type="submit"
          aria-label="Search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0b131e] hover:text-orange-500 transition-colors flex items-center justify-center cursor-pointer"
        >
          <Search className="w-5 h-5 stroke-[2]" />
        </button>
      </form>

      {/* Live Search Suggestion Dropdown */}
      {isOpen && searchQuery.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-[9999]">
          {filteredProducts.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 bg-white border border-gray-100 rounded p-1">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 leading-tight">
                      {product.name}
                    </h4>
                    <div className="text-sm font-extrabold text-gray-950 mt-1">
                      {product.price.toLocaleString()}৳
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found!
            </div>
          )}
        </div>
      )}

    </div>
  );
}