'use client';

import Image from 'next/image';
import Link from 'next/link';
import { promoBannersData } from '@/data/banners';

export default function PromoBanners() {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {promoBannersData.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative block w-full overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl"
            >
              {/* 🔴 কম হাইট পাওয়ার জন্য aspect ratio পরিবর্তন করা হয়েছে (aspect-[2.8/1] sm:aspect-[3/1]) */}
              <div className="relative w-full aspect-[2.8/1] sm:aspect-[3/1] overflow-hidden">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover animate-slow-zoom"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}