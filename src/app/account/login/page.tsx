'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('againsoft');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logged in successfully!');
  };

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb matching exact site style */}
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
            Login
          </span>
        </nav>

        {/* Center Login Box */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <div className="bg-white rounded-xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 w-full max-w-lg space-y-5">
            
            {/* Title & Divider Bar */}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#0048ad] tracking-tight">
                ACCOUNT LOGIN
              </h1>
              <div className="w-10 h-0.5 bg-gray-300 mt-2"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">
                  Email
                </label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-[#f4f7ff] text-gray-900 shadow-2xs"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-gray-800">
                  Password
                </label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-600 bg-[#f4f7ff] text-gray-900 shadow-2xs"
                />
                
                {/* Forgotten / Register Links */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm pt-1 text-blue-600 font-medium">
                  <Link href="/account/forgotten" className="hover:underline">
                    Forgotten Password
                  </Link>
                  <span className="text-gray-400">/</span>
                  <Link href="/account/register" className="hover:underline">
                    Register Account
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3 rounded-md text-sm transition-all shadow-sm cursor-pointer tracking-wide"
                >
                  LOGIN
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
}