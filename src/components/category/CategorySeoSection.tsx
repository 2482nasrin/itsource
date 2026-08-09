'use client';

import React from 'react';
import Link from 'next/link';

interface PriceItem {
  id: string | number;
  name: string;
  price: number;
}

interface CategorySeoProps {
  categoryName: string;
  priceList: PriceItem[];
}

export default function CategorySeoSection({ categoryName, priceList }: CategorySeoProps) {
  return (
    <section className="w-full mt-10 space-y-6 text-gray-800">
      
      {/* 🔴 1. SEO Content Box */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 capitalize">
          {categoryName}
        </h2>
        
        <p className="text-xs sm:text-[15px] text-gray-600 leading-relaxed">
          Whether you&apos;ve recently purchased a new computer or are still using an older model, it&apos;s always a good idea to consider investing in some {categoryName.toLowerCase()} to optimize your experience. Personal computers and tech setups have a wide range of products available on the market to elevate performance and usability. Each product you purchase contributes to the overall functionality, allowing you to get the most out of your device.
        </p>

        <h3 className="text-sm sm:text-base font-bold text-gray-900 pt-2 capitalize">
          {categoryName} Price in Bangladesh at ITSource BD
        </h3>

        <p className="text-xs sm:text-[15px] text-gray-600 leading-relaxed">
          If you&apos;re looking to buy <span className="font-semibold text-gray-800">{categoryName}</span> in Bangladesh, ITSource BD has got you covered. We offer a comprehensive price list that includes all the latest and greatest products available in the market. Our prices are competitive, and we also offer benefits such as authentic warranty, product exchange, and quick delivery across Bangladesh.
        </p>

        <p className="text-xs sm:text-[15px] text-gray-600 leading-relaxed">
          Our website provides you with detailed information about every product we sell, including specifications, key features, pictures, ratings, and customer reviews. Follow our official <span className="font-bold text-gray-800">Facebook</span> page and YouTube channel to stay updated on special offers.
        </p>
      </div>

      {/* 🔴 2. Latest Price List Table */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Latest {categoryName} Price List in BD 2026
          </h2>
          <p className="text-[15px] text-gray-500 mt-0.5">
            View last updated 25-07-2026 prices of {categoryName} in Bangladesh. Get the best deals on high-quality products from top brands.
          </p>
        </div>

        {/* Price Table with Clickable Product Links */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-[13px]">
            <thead>
              <tr className="border-b border-gray-200 text-gray-900 font-bold">
                <th className="py-2.5 px-2">Product Name</th>
                <th className="py-2.5 px-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {priceList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-2 font-medium leading-snug">
                    <Link 
                      href={`/product/${item.id}`} 
                      className="text-gray-800 hover:text-orange-500 transition-colors block"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-2.5 px-2 text-right font-bold text-gray-900 whitespace-nowrap">
                    {item.price.toLocaleString()}৳
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}