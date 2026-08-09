'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterSidebar() {
  // Accordion Sections State
  const [openSections, setOpenSections] = useState({
    price: true,
    brand: true,
    availability: true,
  });

  // Price State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500);

  // Selected Checkboxes State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(['In Stock']); // Default In Stock checked

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleAvailability = (item: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  return (
    // Fixed 250px Width Container
    <aside className="w-[250px] shrink-0 bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 text-sm space-y-4">
      
      {/* 1. Price Range Accordion */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center text-[16px] font-bold text-gray-900 py-1"
        >
          <span>Price Range</span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              openSections.price ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-3">
            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-1.5 bg-gray-200 rounded-lg"
            />

            {/* Input Box Row */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded text-center text-[13px] text-gray-800 focus:outline-none focus:border-orange-500"
              />
              <span className="text-gray-400 text-xs">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-1/2 px-2 py-1 border border-gray-300 rounded text-center text-[13px] text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Brand Accordion */}
      <div className="border-b border-gray-100 pb-4">
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex justify-between items-center text-[16px] font-bold text-gray-900 py-1"
        >
          <span>Brand</span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              openSections.brand ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {openSections.brand && (
          <div className="mt-2.5 space-y-2 text-xs text-gray-600 font-normal">
            {['Baseus', 'Ugreen', 'Wiwu', 'Orico', 'Acasis'].map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label key={brand} className="flex items-center text-[13px] gap-2.5 cursor-pointer hover:text-orange-500 transition-colors">
                  <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 accent-orange-500 cursor-pointer" 
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Availability Accordion (Brand-এর মতো সেম স্টাইল) */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex justify-between items-center text-[16px] font-bold text-gray-900 py-1"
        >
          <span>Availability</span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              openSections.availability ? 'rotate-180' : ''
            }`} 
          />
        </button>

        {openSections.availability && (
          <div className="mt-2.5 space-y-2 text-xs text-gray-600 font-normal">
            {['In Stock', 'Pre Order', 'Up Coming'].map((item) => {
              const isChecked = selectedAvailability.includes(item);
              return (
                <label key={item} className="flex items-center text-[13px] gap-2.5 cursor-pointer hover:text-orange-500 transition-colors">
                  <input 
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAvailability(item)}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 accent-orange-500 cursor-pointer" 
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

    </aside>
  );
}