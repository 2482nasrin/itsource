'use client';

import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SubCategoryItem {
  title: string;
  items?: string[];
}

interface MainMenuData {
  title: string;
  subCategories: SubCategoryItem[];
}

const menuData: MainMenuData[] = [
  {
    title: 'ACCESSORIES',
    subCategories: [
      { title: 'ACCESSORIES BAG' },
      { title: 'BLUETOOTH ADAPTER' },
      { title: 'CABLE' },
      { title: 'CABLE & CONVERTER' },
      { title: 'CABLE ORGANIZER' },
      { title: 'CAPTURE CARD' },
      { title: 'CARD READER' },
      { title: 'CONVERTER' },
      { title: 'DIGITAL VOICE RECORDER' },
      { title: 'HDD-SSD ENCLOSURE' },
      { title: 'HDMI & VGA SPLITTER' },
      { title: 'HDMI & VGA SWITCHER' },
      { title: 'HDMI EXTENDER' },
      { 
        title: 'KVM SWITCH', 
        items: ['FJGEAR', 'MT-VIKI', 'UGREEN', 'UNITEK'] 
      },
      { title: 'MEMORY CARD' },
      { 
        title: 'MOUSE', 
        items: ['WIRELESS MOUSE', 'GAMING MOUSE', 'WIRED MOUSE'] 
      },
      { title: 'MOUSE PAD' },
      { title: 'MULTI-VIEWER' },
    ],
  },
  { title: 'CAMERA', subCategories: [{ title: 'ACTION CAMERA' }, { title: 'IP CAMERA' }] },
  { title: 'GADGET', subCategories: [{ title: 'SMART WATCH' }, { title: 'POWER BANK' }] },
  { title: 'GAMING', subCategories: [{ title: 'GAMING CHAIR' }, { title: 'GAMEPAD' }] },
  { title: 'HEADPHONE & MICROPHONE', subCategories: [{ title: 'HEADPHONE' }, { title: 'MICROPHONE' }] },
  { title: 'LAPTOP ACCESSORIES', subCategories: [{ title: 'LAPTOP COOLER' }, { title: 'LAPTOP BAG' }] },
  { title: 'NETWORKING', subCategories: [{ title: 'ROUTER' }, { title: 'SWITCH' }] },
  { title: 'OFFICE EQUIPMENT', subCategories: [{ title: 'PRINTER' }, { title: 'SCANNER' }] },
  { title: 'COMPONENT', subCategories: [{ title: 'PROCESSOR' }, { title: 'RAM' }, { title: 'GRAPHICS CARD' }] },
  { title: 'TV & SPEAKER', subCategories: [{ title: 'BLUETOOTH SPEAKER' }, { title: 'SOUNDBAR' }] },
];

interface MainMenuProps {
  isScrolled: boolean;
}

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*/g, '-and-')
    .replace(/\s+/g, '-');
};

export default function MainMenu({ isScrolled }: MainMenuProps) {
  const totalMenus = menuData.length;

  return (
    <nav
      className={`bg-white border-b border-gray-200 hidden md:block h-[60px] w-full transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-full px-4 md:px-6 lg:px-8 h-full flex items-center justify-between relative">
        {menuData.map((menu, index) => {
          const hasSub = menu.subCategories.length > 0;
          
          // মেনুটি যদি শেষের ৪টি বা তার বেশি ডানদিকের মেনু হয়, তবে ডানদিকে সাবমেনু এলাইন হবে
          const isRightAligned = index >= totalMenus - 4;

          return (
            <div
              key={menu.title}
              className="relative h-full flex items-center group shrink-0"
            >
              <Link
                href={`/category/${createSlug(menu.title)}`}
                className="text-[12px] md:text-[13px] lg:text-[13px] font-semibold tracking-tight transition-colors flex items-center h-full border-b-2 border-transparent hover:border-orange-500 text-gray-900 hover:text-orange-500 whitespace-nowrap"
              >
                {menu.title}
              </Link>

              {/* Level 1 Submenu */}
              {hasSub && (
                <div
                  className={`absolute top-full w-64 bg-white shadow-xl border border-gray-100 rounded-b-md z-50 py-1 transition-all duration-200 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 ${
                    isRightAligned ? 'right-0' : 'left-0'
                  }`}
                >
                  <div className="text-[13px] font-semibold text-gray-800">
                    {menu.subCategories.map((sub) => {
                      const hasNested = sub.items && sub.items.length > 0;

                      return (
                        <div key={sub.title} className="relative group/nested">
                          <Link
                            href={`/category/${createSlug(sub.title)}`}
                            className="flex items-center justify-between px-4 py-2 hover:bg-[#0b131e] hover:text-white text-gray-800 transition-colors"
                          >
                            {/* ডানদিকের মেনুতে Chevron আইকন বামে দেখাবে */}
                            {isRightAligned && hasNested && (
                              <ChevronLeft className="w-3.5 h-3.5 text-gray-400 group-hover/nested:text-white" />
                            )}
                            
                            <span>{sub.title}</span>

                            {!isRightAligned && hasNested && (
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/nested:text-white" />
                            )}
                          </Link>

                          {/* Level 2 Submenu (Side Flyout) */}
                          {hasNested && (
                            <div
                              className={`absolute top-0 w-52 bg-white shadow-2xl border border-gray-100 py-1 hidden group-hover/nested:block z-50 ${
                                isRightAligned
                                  ? 'right-full rounded-l-md'
                                  : 'left-full rounded-r-md'
                              }`}
                            >
                              {sub.items!.map((item) => (
                                <Link
                                  key={item}
                                  href={`/category/${createSlug(item)}`}
                                  className="block px-4 py-2 hover:bg-[#0b131e] hover:text-white text-gray-800 font-bold text-[13px] transition-colors"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}