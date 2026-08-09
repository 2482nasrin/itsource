'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gift, ShoppingBag, ShoppingCart, Home, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function BottomNav() {
  const { cart, setIsCartOpen, isCartOpen } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // হাইড্রেশন এরর এড়াতে মাউন্ট হওয়ার পর ডাইনামিক কাউন্ট দেখাবে
  const totalItems = isMounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121c2a] text-white border-t border-gray-800 z-[999] flex items-center justify-around py-2 px-1 shadow-lg">
      
      {/* Eid Offer */}
      <Link href="/eid-offer" className="flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors">
        <Gift className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Eid Offer</span>
      </Link>

      {/* Offers */}
      <Link href="/offers" className="flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors">
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Offers</span>
      </Link>

      {/* Cart Button */}
      <button 
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors relative cursor-pointer bg-transparent border-none"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
            {totalItems}
          </span>
        </div>
        <span className="text-[10px] font-medium mt-0.5">Cart</span>
      </button>

      {/* Home */}
      <Link href="/" className="flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Home</span>
      </Link>

      {/* Login / Account */}
      <Link href="/account/login" className="flex flex-col items-center justify-center text-gray-200 hover:text-orange-400 transition-colors">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Login</span>
      </Link>
      
    </div>
  );
}