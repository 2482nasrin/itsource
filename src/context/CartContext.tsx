'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { id: number; name: string; price: number; image: string }, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('againsoft_cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage', error);
        }
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('againsoft_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: { id: number; name: string; price: number; image: string }, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const subTotal = isMounted ? cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) : 0;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen }}>
      {children}

      {/* 🔴 গ্লোবাল স্লাইড-ইন কার্ট ড্রয়ার (যেকোনো পেজ বা মোবাইল ভিউ থেকে কাজ করবে) */}
      {isCartOpen && (
        <div 
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 z-[9998] bg-transparent cursor-default"
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#f2f4f8] shadow-2xl z-[9999] flex flex-col justify-between transition-transform duration-300 ease-in-out border-l border-gray-200 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Top Orange Header Bar */}
        <div className="bg-[#f97316] text-white px-4 py-2 flex items-center justify-between font-bold text-base tracking-wider shadow-xs">
          <span>YOUR CART</span>
          <button onClick={() => setIsCartOpen(false)} className="hover:text-gray-200 cursor-pointer">
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Cart Items List Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#f2f4f8]">
          {isMounted && cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="relative bg-white rounded-xl p-3 border border-gray-200/80 shadow-2xs flex items-center justify-between gap-2">
                
                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="absolute top-2.5 right-2.5 text-gray-700 hover:text-red-600 cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>

                {/* Product Info */}
                <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-6">
                  <div className="relative w-14 h-14 bg-white border border-gray-200 rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                      {item.name}
                    </h4>
                    <div className="text-xs font-bold text-gray-800 mt-1.5 flex items-center gap-1">
                      <span>{item.price.toLocaleString()}৳</span>
                      <span className="text-gray-500 font-normal">X</span>
                    </div>
                    
                    {/* Quantity Counter */}
                    <div className="flex items-center border border-gray-300 rounded bg-white w-fit mt-1.5 overflow-hidden shadow-2xs">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-0.5 text-xs text-gray-700 hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                      >-</button>
                      <span className="px-2.5 text-xs font-bold text-blue-600 text-center min-w-[24px]">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-0.5 text-xs text-gray-700 hover:bg-gray-100 font-bold transition-colors cursor-pointer"
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* Total Price Per Item */}
                <div className="text-right flex-shrink-0 pt-4 pl-2 border-l border-gray-100">
                  <span className="font-extrabold text-sm text-gray-950">
                    {(item.price * item.quantity).toLocaleString()}৳
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-24 text-gray-600 text-sm font-medium">
              Your cart is empty!
            </div>
          )}
        </div>

        {/* Bottom Section: Sub-Total, Total & Checkout */}
        <div className="bg-black text-white border-t border-gray-800">
          <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm font-bold border-b border-gray-800">
            <span className="text-gray-300">Sub-Total</span>
            <span className="text-white">{subTotal.toLocaleString()}৳</span>
          </div>
          <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm font-bold border-b border-gray-800">
            <span className="text-gray-300">Total</span>
            <span className="text-white">{subTotal.toLocaleString()}৳</span>
          </div>
          
          {isMounted && cart.length > 0 && (
            <Link 
              href="/checkout/onepagecheckout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-[#031d42] hover:bg-blue-950 text-white font-bold text-center py-4 text-base transition-colors tracking-wide capitalize cursor-pointer"
            >
              Checkout
            </Link>
          )}
        </div>

      </div>

    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}