'use client';

import Image from 'next/image';
import Link from 'next/link';
import { productsData } from '@/data/products';

export default function FeaturedProducts() {
  return (
    <section className="w-full bg-gray-50/50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-[20px] font-bold text-gray-900 tracking-tight">
            Featured Products
          </h2>
          <p className="text-xs sm:text-[14px] text-gray-600 mt-1 sm:mt-1.5 font-medium">
            Check & Get Your Desired Product !
          </p>
        </div>

        {/* Responsive Grid: Mobile 2, Sm 3, Md 4, Lg 6 cols */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {productsData.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative flex flex-col justify-between bg-white rounded-md p-3 sm:p-4 shadow-lg border border-gray-100">
              {/* Discount Tag */}
              {product.saveAmount && (
                <div className="absolute top-0 right-0 z-10 bg-red-600 text-white text-[12px] sm:text-xs font-semibold px-2 py-0.5 rounded-tr-xl rounded-bl-xl shadow-xs">
                  Save: {product.saveAmount.toLocaleString()}৳
                </div>
              )}

              <div>
                {/* Product Image */}
                <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg flex items-center justify-center p-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                </div>

                {/* Rating Stars (ইমেজের নিচে ও টাইটেলের উপরে) */}
                {product.rating ? (
                  <div className="flex justify-center items-center gap-0.5 mb-1.5 min-h-[16px]">
                    {[...Array(product.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-xs sm:text-[20px]">★</span>
                    ))}
                  </div>
                ) : (
                  // স্পেসিং ঠিক রাখার জন্য খালি ডিভ (যাতে যেসব কার্ডে স্টার নেই সেগুলো সমান দেখায়)
                  <div className="min-h-[16px] mb-1.5" />
                )}

                {/* Product Title */}
                <h3 className="text-xs sm:text-[13px] font-bold text-gray-800 text-center uppercase tracking-tight line-clamp-2 leading-tight mb-2">
                  {product.name}
                </h3>
              </div>

              {/* Price Container (No border-t) */}
              <div className="text-center pt-1 flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-sm sm:text-[16px] font-bold text-red-600">
                  {product.price.toLocaleString()}৳
                </span>
                
                {product.originalPrice && (
                  <span className="text-[16px] text-black-700 line-through">
                    {product.originalPrice.toLocaleString()}৳
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}