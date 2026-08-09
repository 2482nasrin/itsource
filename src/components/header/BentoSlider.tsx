'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: "Thunderbolt Expansion",
    bannerImg: "/images/thunderbolt-3.png",
  },
  {
    id: 2,
    title: "Ugreen Power Bank",
    bannerImg: "/images/ugreen-nexode-1.png",
  },
  {
    id: 3,
    title: "Special Accessories",
    bannerImg: "/images/thunderbolt-3.png",
  },
  {
    id: 4, // 🟢 ID ইউনিক করা হলো
    title: "Ugreen Power Bank Extra",
    bannerImg: "/images/ugreen-nexode-1.png",
  },
];

export default function BentoSlider() {
  return (
    <section className="w-full bg-transparent py-4">
      {/* Container Fluid Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{ 
            clickable: true 
          }}
          autoplay={{ 
            delay: 3500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          className="bento-clean-swiper rounded-2xl relative overflow-hidden"
        >
          {slides.map((slide, index) => (
            /* 🟢 Unique Key handling using slide.id and index */
            <SwiperSlide key={`${slide.id}-${index}`}>
              {/* Image Container with compact height */}
              <div className="relative w-full aspect-[21/9] sm:aspect-[28/9] min-h-[160px] sm:min-h-[220px] md:min-h-[300px] rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={slide.bannerImg}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover md:object-fill rounded-2xl"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay Pagination Bullet Styles */}
      <style jsx global>{`
        .bento-clean-swiper {
          padding-bottom: 0 !important;
        }
        
        .bento-clean-swiper .swiper-pagination {
          bottom: 12px !important;
          z-index: 20;
        }

        .bento-clean-swiper .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.5;
          width: 24px;
          height: 4px;
          border-radius: 2px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
        }

        .bento-clean-swiper .swiper-pagination-bullet-active {
          background: #f97316;
          opacity: 1;
          width: 38px;
        }
      `}</style>
    </section>
  );
}