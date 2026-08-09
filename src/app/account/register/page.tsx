'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
  const [subscribe, setSubscribe] = useState('yes');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account registered successfully!');
  };

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb matching Login and Category page style */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          <Link href="/account" className="text-blue-600 hover:text-orange-500 transition-colors font-medium">
            Account
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          <span className="text-gray-800 font-medium">
            Register
          </span>
        </nav>

        {/* Center Register Box */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <div className="bg-white rounded-xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 w-full max-w-xl space-y-5">
            
            {/* Title & Divider Bar */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#0048ad] tracking-tight">
                REGISTER ACCOUNT
              </h1>
              <div className="w-10 h-0.5 bg-gray-300 mt-2"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Name</label>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                />
              </div>

              {/* E-Mail */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">E-Mail</label>
                <input 
                  type="email" 
                  placeholder="E-Mail" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Phone</label>
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Address</label>
                <input 
                  type="text" 
                  placeholder="Address" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                />
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">City</label>
                <input 
                  type="text" 
                  defaultValue="againteam" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-[#f4f7ff] text-gray-900 shadow-2xs" 
                />
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Region</label>
                <select className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs">
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* State */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">State</label>
                <select className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-700 shadow-2xs">
                  <option value="">--- Please Select ---</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </select>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-[#f4f7ff] text-gray-900 shadow-2xs" 
                />
              </div>

              {/* Password Confirm */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">Password Confirm</label>
                <input 
                  type="password" 
                  placeholder="Password Confirm" 
                  required 
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                />
              </div>

              {/* Subscribe Radio */}
              <div className="pt-1">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">Subscribe</label>
                <div className="flex items-center gap-6 text-sm text-gray-800 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="subscribe" 
                      checked={subscribe === 'yes'} 
                      onChange={() => setSubscribe('yes')}
                      className="accent-blue-600 w-4 h-4" 
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="subscribe" 
                      checked={subscribe === 'no'} 
                      onChange={() => setSubscribe('no')}
                      className="accent-blue-600 w-4 h-4" 
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Continue Button */}
              <div className="pt-3">
                <button 
                  type="submit"
                  className="w-full bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3 rounded-md text-sm transition-all shadow-sm cursor-pointer tracking-wide"
                >
                  CONTINUE
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
}