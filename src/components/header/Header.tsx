'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, X, Plus, Minus } from 'lucide-react';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';
import MainMenu from './MainMenu';

const categoriesData = [
  {
    title: 'ACCESSORIES',
    subCategories: [{ title: 'KEYBOARD' }, { title: 'MOUSE' }],
  },
  { title: 'CAMERA', subCategories: [] },
  { title: 'GADGET', subCategories: [] },
  { title: 'GAMING', subCategories: [] },
  { title: 'HEADPHONE & MICROPHONE', subCategories: [] },
  { title: 'LAPTOP ACCESSORIES', subCategories: [] },
  { title: 'NETWORKING', subCategories: [] },
  { title: 'OFFICE EQUIPMENT', subCategories: [] },
  {
    title: 'COMPONENT',
    subCategories: [{ title: 'PROCESSOR' }, { title: 'RAM' }],
  },
  { title: 'TV & SPEAKER', subCategories: [] },
  {
    title: 'DESKTOP',
    subCategories: [
      { title: 'ALL IN ONE' },
      {
        title: 'ALL-IN-ONE MINI PC',
        items: ['CHUWI', 'INTEL MINI PC', 'APPLE MAC MINI'],
      },
      { title: 'BRAND PC' },
      { title: 'BUDGET PC' },
      { title: 'COMPONENTS COMBO' },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [openCat, setOpenCat] = useState<string | null>(null);
  const [openSubCat, setOpenSubCat] = useState<string | null>(null);

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ================= 1. MAIN DARK HEADER ================= */}
      {/* 🔴 মোবাইলে এটি sticky top-0 থাকবে, কিন্তু ডেসকটপে (md:) relative থাকবে যেন স্ক্রল করলে উপরে চলে যায় */}
      <div className="bg-[#0b131e] border-b border-gray-800 w-full sticky md:relative top-0 z-50 md:z-auto">
        <div className="w-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between w-full md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-1 focus:outline-none z-50"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-gray-300" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>

            <Link href="/" className="relative w-36 h-9">
              <Image
                src="/images/logo-it.png"
                alt="IT SOURCE"
                fill
                className="object-contain"
                priority
              />
            </Link>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white p-1 focus:outline-none"
              aria-label="Toggle Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Top Header Bar */}
          <div className="hidden md:flex items-center justify-between w-full max-w-[1360px] mx-auto ">
            <Link href="/" className="relative w-56 h-12">
              <Image
                src="/images/logo-it.png"
                alt="IT SOURCE"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <SearchBar />
            <NavIcons />
          </div>
        </div>

        {/* Mobile Input Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 pb-4 border-t border-gray-800 pt-3 bg-[#0b131e]">
            <SearchBar />
          </div>
        )}
      </div>

      {/* ================= 2. DESKTOP MAIN MENU ================= */}
      {/* 🔴 ডেসকটপে এটি sticky top-0 থাকবে এবং স্ক্রল করলে স্থায়ীভাবে টপে আটকে থাকবে */}
      <div className="hidden sm:block sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="w-full max-w-[1360px] mx-auto">
          <MainMenu isScrolled={isScrolled} />
        </div>
      </div>

      {/* ================= 3. MOBILE SMOOTH OFF-CANVAS DRAWER ================= */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`fixed top-[60px] left-0 w-4/5 max-w-[280px] h-[calc(100vh-60px)] bg-[#070d15] border-r border-gray-800 text-white overflow-y-auto z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="divide-y divide-gray-800/80 text-xs uppercase font-bold tracking-wider">
            {categoriesData.map((cat) => {
              const isCatActive = openCat === cat.title;
              const hasSub = cat.subCategories && cat.subCategories.length > 0;

              return (
                <div key={cat.title}>
                  <button
                    onClick={() => setOpenCat(isCatActive ? null : cat.title)}
                    className={`w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors ${
                      isCatActive
                        ? 'bg-[#09101a] text-white'
                        : 'bg-[#070d15] text-gray-200'
                    }`}
                  >
                    <span>{cat.title}</span>
                    {hasSub ? (
                      isCatActive ? (
                        <Minus className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-400" />
                      )
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Sub-categories */}
                  {isCatActive && hasSub && (
                    <div className="bg-white text-gray-900 divide-y divide-gray-200 font-semibold text-[11px]">
                      {cat.subCategories!.map((sub) => {
                        const isSubActive = openSubCat === sub.title;
                        const hasItems = sub.items && sub.items.length > 0;

                        return (
                          <div key={sub.title}>
                            <button
                              onClick={() =>
                                setOpenSubCat(isSubActive ? null : sub.title)
                              }
                              className="w-full pl-6 pr-4 py-2.5 flex items-center justify-between text-left hover:text-orange-600"
                            >
                              <span>{sub.title}</span>
                              {hasItems &&
                                (isSubActive ? (
                                  <Minus className="w-3.5 h-3.5 text-gray-600" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5 text-gray-600" />
                                ))}
                            </button>

                            {isSubActive && hasItems && (
                              <div className="bg-gray-50 pl-10 pr-4 py-1 divide-y divide-gray-100 font-medium text-[11px] text-gray-700">
                                {sub.items!.map((item) => (
                                  <Link
                                    key={item}
                                    href={`/category/${item
                                      .toLowerCase()
                                      .replace(/ /g, '-')}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 hover:text-orange-500"
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
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}