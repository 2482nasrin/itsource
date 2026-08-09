'use client';

interface MarqueeTextProps {
  text?: string;
}

export default function MarqueeText({
  text = 'অর্ডার করার পূর্বে কাস্টমার কেয়ার থেকে পন্যের স্টক ও ডেলিভারি সম্পর্কে জেনে নেয়ার অনুরোধ করা যাচ্ছে। প্রযুক্তি পণ্যের মূল্য অস্থিতিশীল হওয়ায় কারণে যেকোন মুহূর্তে যেকোন প্রযুক্তি পণ্যের মূল্য পরিবর্তন হতে পারে।',
}: MarqueeTextProps) {
  return (
    <section className="w-full py-4 sm:py-6 bg-transparent">
      {/* Container Fluid */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Main White Pill Container */}
        <div className="relative bg-white border-none rounded-full py-3.5 sm:py-4 shadow-md sm:shadow-lg transition-shadow duration-300">
          
          {/* 🔴 Left and Right Padding Mask Container (এর ভেতরে টেক্সট ভিজিবল থাকবে) */}
          <div className="mx-6 sm:mx-10 overflow-hidden flex relative">
            
            {/* Continuous Infinite Scrolling Track */}
            <div className="flex whitespace-nowrap animate-marquee text-[13px] font-semibold text-[#333] tracking-wide">
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
            </div>

            {/* Duplicate Track for Smooth Endless Loop */}
            <div
              className="flex whitespace-nowrap animate-marquee text-[13px] font-semibold text-[#333] tracking-wide"
              aria-hidden="true"
            >
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
              <span className="mx-8 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                {text}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Infinite Smooth Animation Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}