'use client';

import Link from 'next/link';
import { bestSellingData } from '@/data/bestSelling';

export default function BestSellingTable() {
  return (
    <section className="w-full py-8 bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-md border border-gray-100/80">
          
          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-[24px] font-bold text-gray-900 mb-4 sm:mb-6">
            Best-Selling Products Right Now – June 2026
          </h2>

          {/* Table Wrapper for Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-left border-collapse min-w-[500px]">
              
              {/* Table Header */}
              <thead>
                <tr className="bg-[#0b132a] text-white text-[13px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-bold border-r border-gray-700 w-3/4">Product</th>
                  <th className="py-3 px-4 font-bold w-1/4">Price (BDT)</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 text-xs sm:text-sm font-medium text-gray-800">
                {bestSellingData.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={index % 2 === 0 ? 'bg-white hover:bg-gray-50/80' : 'bg-gray-50/50 hover:bg-gray-50'}
                  >
                    {/* Linked Title */}
                    <td className="py-2.5 sm:py-3 px-4 border-r border-gray-200 leading-snug text-[14px]">
                      <Link 
                        href={`/product/${item.id}`}
                        className="hover:text-red-600 transition-colors duration-200 block"
                      >
                        {item.name}
                      </Link>
                    </td>

                    {/* Price */}
                    <td className="py-2.5 sm:py-3 px-4 text-gray-700 whitespace-nowrap text-[14px]">
                      ৳{item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <div className="mt-4 space-y-1 text-[14px] text-gray-500 italic">
            <p>Prices subject to change. Please verify current pricing and stock availability with our customer care team.</p>
            <p className="not-italic font-bold text-gray-800 pt-1">
              Shop smart. Get genuine. Get it delivered fast at IT Source BD.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}