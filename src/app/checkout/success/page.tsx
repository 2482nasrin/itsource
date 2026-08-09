'use client';

import Link from 'next/link';
import { Home, CheckCircle2, Package, Mail, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderId = "5647"; // এটি ডাইনামিক্যালি আসা উচিত

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-6">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb - আগের মতো */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-6">
          <Link href="/" className="hover:text-orange-500"><Home className="w-4 h-4" /></Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-orange-500">Shopping Cart</Link>
          <span>/</span>
          <Link href="/checkout" className="hover:text-orange-500">Checkout</Link>
          <span className="text-gray-800">/ Success</span>
        </nav>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12 text-center max-w-3xl mx-auto">
          
          {/* Animated Success Icon */}
          <div className="mx-auto w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Thank you for your order!</h1>
          <p className="text-gray-500 mb-8">Your order <span className="font-bold text-blue-600">#{orderId}</span> has been successfully placed.</p>

          {/* Action Box */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8 text-left space-y-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-gray-700">We are processing your order and will contact you shortly for verification.</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-gray-700">
                If you have any questions, feel free to call us or visit our 
                <a href="#" className="text-blue-600 font-bold ml-1 hover:underline">Contact Page</a>.
              </p>
            </div>
          </div>

          {/* Policy Note */}
          <p className="text-[11px] text-gray-400 leading-relaxed mb-8 px-4">
            * Manufacturing flaw claims are accepted within 2 calendar days of delivery. 
            The product must be returned with the original box and accessories.
          </p>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            CONTINUE SHOPPING <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}