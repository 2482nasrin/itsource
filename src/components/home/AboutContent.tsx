'use client';

export default function AboutContent() {
  return (
    <section className="w-full py-8 bg-transparent">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* White Background Card with Shadow */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-100/80 text-gray-700 leading-relaxed text-sm sm:text-base space-y-6">
          
          {/* Main Title & Intro */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-[24px] font-extrabold text-gray-900 tracking-tight mb-3 sm:mb-4">
              Most Popular Computer & Mobile Accessories Shop in Bangladesh
            </h1>
            <p className="mb-3 text-[16px]">
              <strong className="text-gray-900">IT Source BD</strong> is Bangladesh’s leading dedicated online and retail store for computer accessories, mobile gadgets, laptop peripherals, and the latest tech products — all at honest prices, with genuine warranty support.
            </p>
            <p className="mb-3 text-[16px]">
              Whether you’re a student setting up your first laptop, a professional upgrading a home office, a content creator building a studio, or a gamer who wants the right gear — you’ll find what you need here, without the hassle of hunting through unreliable shops or worrying about fake products.
            </p>
            <p className="mb-3 text-[16px">
              Based at <strong className="text-black-500">Multiplan Center, New Elephant Road, Dhaka</strong> — right in the heart of Bangladesh’s tech market — and available online at itsource-bd.com, we serve customers across Dhaka and nationwide. Every product in our catalog is sourced from authorized distributors, backed by proper warranty, and priced fairly. No grey-market imports, no counterfeits, no runaround after the sale.
            </p>
            <p className="text-[16px]">
              We are proud members of <strong className="text-black-500">BCS (Bangladesh Computer Samity)</strong> and <strong className="text-gray-900">ECAB (E-Commerce Association of Bangladesh)</strong>, and we’ve built our reputation one genuine product and one satisfied customer at a time.
            </p>
          </div>

          {/* Sub Section: What We Sell */}
          <div className="pt-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">
              What We Sell — A Complete Range of Tech Accessories
            </h2>
            <p className="text-[16px]">
              We stock thousands of products across a wide range of categories — all sourced from authorized distributors and globally recognized brands including <strong className="text-gray-900">Ugreen, ORICO, Anker, Logitech, A4Tech, Fantech, Havit, Micropack, MT-Viki, SSK, Acasis, Belkin, Rapoo, SteelSeries</strong>, and many more. Every product is backed by proper warranty support and our dedicated after-sales team. Here’s a closer look at what you’ll find:
            </p>
          </div>

          {/* Category List */}
          <div className="space-y-4 pt-1">
            
            {/* Cables */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                Cables, Converters & Connectivity Solutions
              </h3>
              <p className="text-gray-600 text-[16px]">
                In a world where every device uses a different port, having the right <strong className="text-black-500">cable & converter</strong> on hand is non-negotiable. Our connectivity range covers virtually every combination you can think of — VGA to HDMI, USB-C to HDMI, HDMI to DVI, DisplayPort, MagSafe 3, USB printer cables, and high-speed CAT 6 and CAT 8 Ethernet cables for stable wired networking.
              </p>
            </div>

            {/* USB Hubs */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                USB Hubs & Docking Stations
              </h3>
              <p className="text-gray-600 text-[16px]">
                Modern laptops are sleek but often short on ports. Our <strong className="text-black-500">USB and Type-C hub</strong> collection bridges that gap beautifully. Choose from compact 3-in-1 travel hubs to fully-featured 13-in-1 Thunderbolt 4 docking stations that add dual 4K displays, Ethernet, multiple USB-A and USB-C ports, SD card readers, and PD charging — all through a single cable connection.
              </p>
            </div>

            {/* Enclosures */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                HDD & SSD Enclosures
              </h3>
              <p className="text-gray-600 text-[16px]">
                Don’t let old hard drives gather dust. Our <strong className="text-black-500">HDD and SSD enclosure</strong> selection lets you repurpose any 2.5-inch or 3.5-inch SATA drive as a plug-and-play portable storage device. Brands like ORICO, SSK, and Acasis offer tool-free designs, USB 3.0 and USB-C interfaces, and transfer speeds up to 6 Gbps.
              </p>
            </div>

            {/* Laptop Accessories */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                Laptop Accessories
              </h3>
              <p className="text-gray-600 text-[16px] mb-2">
                Whether you’re a student carrying your laptop to class or a remote worker building a home office, the right accessories make all the difference. Our <strong className="text-gray-800">laptop accessories</strong> category covers everything:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-[18px]">
                <li><strong className="text-black-500">Laptop Bags & Sleeves</strong> — from slim protective sleeves to full-featured backpacks with multiple compartments, available for 13-inch to 17-inch laptops.</li>
                <li><strong className="text-black-500">Laptop Stands</strong> — ergonomic stands that raise your screen to eye level, reducing neck and back strain during long work sessions.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}