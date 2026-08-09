'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, Trash2, RefreshCw, ShoppingCart, AlertTriangle } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  model: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  // ডেমো কার্ট আইটেম (প্রোডাক্ট না থাকলে এখানে খালি অ্যারে [] করে দিতে পারেন)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'LDNIO 6 USB Ports and 3 Power Socket Extension',
      model: 'Sc3604',
      price: 1090,
      quantity: 2,
      image: '/images/products/docking-station.png',
    },
    {
      id: 2,
      name: 'LENOVO H203 HDMI TO VGA+ 3.5 MM CONVERTER',
      model: 'H203',
      price: 950,
      quantity: 4,
      image: '/images/products/cable.png',
    }
  ]);

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0a3a64] font-medium">Shopping Cart</span>
        </nav>

        {/* Main Cart Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <>
              {/* Responsive Table / Card Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fcf8f2] text-gray-800 text-xs sm:text-sm font-bold border-y border-gray-200">
                      <th className="p-3">Image</th>
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Model</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Unit Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-700">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="p-3 w-20">
                          <div className="relative w-14 h-14 bg-gray-50 border rounded-lg p-1">
                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                          </div>
                        </td>
                        <td className="p-3 font-bold text-gray-900 max-w-xs">
                          <Link href={`/product/${item.id}`} className="hover:text-orange-500 transition-colors">
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-3 text-gray-600 font-medium">{item.model}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              min="1"
                              value={item.quantity} 
                              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                              className="w-16 border border-gray-300 rounded px-2 py-1.5 text-center text-sm font-bold focus:outline-none focus:border-orange-500 bg-white"
                            />
                            <button 
                              title="Update"
                              className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              title="Remove"
                              className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-gray-800">{item.price.toLocaleString()}৳</td>
                        <td className="p-3 text-right font-extrabold text-[#e11d48]">
                          {(item.price * item.quantity).toLocaleString()}৳
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <div className="w-full sm:w-80 space-y-2 text-sm">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg font-medium text-gray-700 border">
                    <span>Sub-Total:</span>
                    <strong className="text-gray-900">{subTotal.toLocaleString()}৳</strong>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg font-bold text-gray-900 border">
                    <span>Total:</span>
                    <strong className="text-[#e11d48]">{subTotal.toLocaleString()}৳</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-gray-200">
                <Link 
                  href="/"
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-xs"
                >
                  CONTINUE SHOPPING
                </Link>
                <Link 
                  href="/checkout/onepagecheckout"
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-xs"
                >
                  CONFIRM ORDER
                </Link>
              </div>
            </>
          ) : (
            /* 🔴 Empty Cart State */
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 mx-auto text-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-20 h-20 stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
              <p className="text-gray-600 text-sm">Your shopping cart is empty!</p>
              <div className="pt-2">
                <Link 
                  href="/" 
                  className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 px-8 rounded-xl text-sm transition-all shadow-sm"
                >
                  CONTINUE
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}