'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 🔴 নেভিগেশনের জন্য রাউটার ইমপোর্ট করা হলো
import { Home, ChevronRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter(); // 🔴 রাউটার হুক ইনিশিয়ালাইজ করা হলো

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    telephone: '',
    email: '',
    city: 'Dhaka',
    comment: ''
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  // ডেলিভারি চার্জ স্টেট (ডিফল্ট ঢাকার ভেতরে ৬০ টাকা)
  const [deliveryCharge, setDeliveryCharge] = useState(60);

  // ডেমো কার্ট সাব-টোটাল (প্রোডাক্টগুলোর মূল মূল্য)
  const subTotal = 5980; 
  const grandTotal = subTotal + deliveryCharge;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Services / Terms & Conditions');
      return;
    }
    
    // সফলভাবে অর্ডার প্লেস হওয়ার পর সাকসেস পেজে রিডাইরেক্ট হবে
    router.push('/checkout/success');
  };

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/checkout/cart" className="hover:text-orange-500 transition-colors text-blue-600">
            Shopping Cart
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0a3a64] font-medium">Checkout</span>
        </nav>

        {/* Checkout Main Title Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-blue-200">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Customer Information Form (Col 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <span className="w-6 h-6 rounded-full bg-[#0070f3] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">Customer Information</h2>
            </div>

            <div className="space-y-3">
              <div>
                <input 
                  type="text" 
                  placeholder="First Name*" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Last Name*" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Address*" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Telephone*" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="E-Mail*" 
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="City*" 
                  defaultValue="Dhaka"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white"
                />
              </div>
              <div>
                <select className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white text-gray-800">
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                </select>
              </div>
              <div>
                <textarea 
                  rows={3}
                  placeholder="Comment" 
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-orange-500 bg-white resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column: Payment, Delivery & Order Overview (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Payment & Delivery Methods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 border-b pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#0070f3] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h2 className="font-bold text-gray-900 text-sm sm:text-base">Payment Method</h2>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                  <p className="font-medium text-gray-500">Select a payment method</p>
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input type="radio" name="payment" defaultChecked className="accent-blue-600" />
                    <span className="font-semibold text-gray-900">Cash On Delivery</span>
                  </label>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 border-b pb-3">
                  <span className="w-6 h-6 rounded-full bg-[#0070f3] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h2 className="font-bold text-gray-900 text-sm sm:text-base">Delivery Method</h2>
                </div>
                <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <p className="font-medium text-gray-500">Select a delivery method</p>
                  
                  {/* Inside Dhaka */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="delivery" 
                      checked={deliveryCharge === 60}
                      onChange={() => setDeliveryCharge(60)}
                      className="accent-blue-600" 
                    />
                    <span className="font-semibold text-gray-900">Inside of Dhaka City - 60৳</span>
                  </label>

                  {/* Outside Dhaka */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="delivery" 
                      checked={deliveryCharge === 120}
                      onChange={() => setDeliveryCharge(120)}
                      className="accent-blue-600" 
                    />
                    <span className="font-semibold text-gray-900">Outside of Dhaka City - 120৳</span>
                  </label>

                </div>
              </div>

            </div>

            {/* Voucher & Promo Code Section */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Gift Voucher" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500" />
                <button type="button" className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold px-3 py-2 rounded-md text-xs transition-colors">APPLY VOUCHER</button>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Promo Code" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-orange-500" />
                <button type="button" className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold px-3 py-2 rounded-md text-xs transition-colors">APPLY PROMO CODE</button>
              </div>
            </div>

            {/* Order Overview */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4">
              <div className="flex items-center gap-2 border-b pb-3">
                <span className="w-6 h-6 rounded-full bg-[#0070f3] text-white text-xs font-bold flex items-center justify-center">4</span>
                <h2 className="font-bold text-gray-900 text-sm sm:text-base">Order Overview</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b text-gray-700 font-bold bg-gray-50">
                      <th className="p-2.5">Product Name</th>
                      <th className="p-2.5">Unit Price</th>
                      <th className="p-2.5">Quantity</th>
                      <th className="p-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700 font-medium">
                    <tr>
                      <td className="p-2.5 font-bold text-gray-900">LDNIO 6 USB Ports and 3 Power Socket Extension</td>
                      <td className="p-2.5">1,090৳</td>
                      <td className="p-2.5">2</td>
                      <td className="p-2.5 text-right font-extrabold text-gray-900">2,180৳</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-gray-900">LENOVO H203 HDMI TO VGA+ 3.5 MM CONVERTER</td>
                      <td className="p-2.5">950৳</td>
                      <td className="p-2.5">4</td>
                      <td className="p-2.5 text-right font-extrabold text-gray-900">3,800৳</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Subtotals & Dynamic Delivery Charge */}
              <div className="border-t pt-3 space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                <div className="flex justify-between">
                  <span>Delivery Charge ({deliveryCharge === 60 ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                  <span className="font-bold">{deliveryCharge}৳</span>
                </div>
                <div className="flex justify-between">
                  <span>Sub-Total:</span>
                  <span className="font-bold">{subTotal.toLocaleString()}৳</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#e11d48] pt-2 border-t">
                  <span>Total:</span>
                  <span>{grandTotal.toLocaleString()}৳</span>
                </div>
              </div>

              {/* Terms Agreement & Confirm Order Button */}
              <div className="pt-4 border-t space-y-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-700">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-blue-600 w-4 h-4 rounded" 
                  />
                  <span>I have read and agree to the <Link href="/terms" className="text-blue-600 underline">Services</Link></span>
                </label>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-3.5 px-8 rounded-md text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                  >
                    CONFIRM ORDER
                  </button>
                </div>
              </div>

            </div>

          </div>

        </form>

      </div>
    </main>
  );
}