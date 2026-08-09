'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
  id: number;
  name: string;
  icon: string;
  link: string;
}

const categories: CategoryItem[] = [
  { id: 1, name: 'Router', icon: '/images/categories/router.png', link: '/category/router' },
  { id: 2, name: 'USB & Type C HUB', icon: '/images/categories/hub.png', link: '/category/usb-hub' },
  { id: 3, name: 'Cable & Converter', icon: '/images/categories/cable.png', link: '/category/cable' },
  { id: 4, name: 'Camera Tripod', icon: '/images/categories/tripod.png', link: '/category/tripod' },
  { id: 5, name: 'HDD-SSD Enclosure', icon: '/images/categories/enclosure.png', link: '/category/enclosure' },
  { id: 6, name: 'Brand PC Power Supply', icon: '/images/categories/power.png', link: '/category/power-supply' },
  { id: 7, name: 'Graphics Tablet', icon: '/images/categories/tablet.png', link: '/category/graphics-tablet' },
  { id: 8, name: 'Microphone', icon: '/images/categories/mic.png', link: '/category/microphone' },
  { id: 9, name: 'Headphone', icon: '/images/categories/headphone.png', link: '/category/headphone' },
  { id: 10, name: 'Laptop Bag & Sleeve', icon: '/images/categories/bag.png', link: '/category/laptop-bag' },
  { id: 11, name: 'Bluetooth Adapter', icon: '/images/categories/bluetooth.png', link: '/category/bluetooth-adapter' },
  { id: 12, name: 'Macbook Accessories', icon: '/images/categories/macbook.png', link: '/category/macbook-accessories' },
  { id: 13, name: 'Gadget', icon: '/images/categories/gadget.png', link: '/category/gadget' },
  { id: 14, name: 'TV & Speaker', icon: '/images/categories/tv-speaker.png', link: '/category/tv-speaker' },
  { id: 15, name: 'Office Equipment', icon: '/images/categories/printer.png', link: '/category/office-equipment' },
  { id: 16, name: 'Camera', icon: '/images/categories/camera.png', link: '/category/camera' },
];

export default function FeaturedCategory() {
  return (
    <section className="w-full py-8 bg-transparent">
      {/* Container Fluid */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Subtitle */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-[2xl] md:text-3[20px] font-bold text-gray-900 tracking-tight">
            Featured Category
          </h2>
          <p className="text-xs sm:text-[14px] text-gray-600 mt-1 sm:mt-1.5 font-medium">
            Get Your Desired Product from Featured Category!
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group flex flex-col items-center justify-center p-4 bg-white rounded-md border border-gray-100/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer min-h-[140px] sm:min-h-[150px]"
            >
              {/* Icon Wrapper */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src={cat.icon}
                  alt={cat.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 48px, 56px"
                />
              </div>

              {/* Category Name */}
              <span className="text-xs sm:text-[13px] font-bold text-gray-800 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}