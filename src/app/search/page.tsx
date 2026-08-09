'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, X, AlertTriangle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// ডেমো প্রোডাক্ট ডাটাবেস
const allProductsDatabase = [
  { id: 1, name: 'UGREEN 10M USB PRINTER CABLE (10374)', price: 1650, originalPrice: null, image: '/images/products/cable.png' },
  { id: 2, name: 'UGREEN 2PORT HDMI SWITCHER / SPLITTER 50966 BLACK', price: 1150, originalPrice: null, image: '/images/products/docking-station.png' },
  { id: 3, name: 'UGREEN 4K MINI HDMI TO HDMI CONVERTER (20137)', price: 750, originalPrice: 950, image: '/images/products/cable.png' },
  { id: 4, name: 'UGREEN US355-A USB 3.0 to ethernet Adapter cable', price: 1450, originalPrice: null, image: '/images/products/charger-1.png' },
  { id: 5, name: 'UGREEN 12W 2A POWER ADAPTER CD264(20359)', price: 950, originalPrice: null, image: '/images/products/charger-2.png' },
  { id: 6, name: 'UGREEN 3.5MM MALE TO 2RCA CABLE 5M(10513)', price: 1350, originalPrice: null, image: '/images/products/cable.png' },
  { id: 7, name: 'UGREEN 5 IN 1 OUT HDMI 2.0 SWITCHER CM512(50710)', price: 5, originalPrice: null, image: '/images/products/docking-station.png' },
  { id: 8, name: 'UGREEN 6 IN 1 STEAM DECK DOCKING STATION CM666(15388)', price: 5450, originalPrice: 6550, image: '/images/products/docking-station.png' },
  { id: 9, name: 'UGREEN ADJUSTABLE 360 ROTATING LAPTOP STAND LP701(25299)', price: 6, originalPrice: null, image: '/images/products/bag.png' },
  { id: 10, name: 'UGREEN ADJUSTABLE LAPTOP STAND LP588(90772)', price: 4200, originalPrice: 4800, image: '/images/products/bag.png' },
  { id: 11, name: 'UGREEN HDMI 8K ULTRA HD CABLE 1.5M HD135 (50562)', price: 2, originalPrice: 2, image: '/images/products/cable.png' },
  { id: 12, name: 'UGREEN NEXODE CAR CHARGER GAN 130W IC706(35027)', price: 4, originalPrice: null, image: '/images/products/charger-1.png' },
  { id: 13, name: 'UGREEN RJ45 JOINER(20390)', price: 550, originalPrice: null, image: '/images/products/docking-station.png' },
  { id: 14, name: 'UGREEN SWIVEL FOLDING TABLET STAND (15791)', price: 3, originalPrice: null, image: '/images/products/bag.png' },
  { id: 15, name: 'UGREEN TOSLINK OPTICAL CABLE 1.5M(70999)', price: 650, originalPrice: null, image: '/images/products/cable.png' },
  { id: 16, name: 'UGREEN USB2.0 MALE TO FEMALE EXTENSION CABLE 1M(40666)', price: 550, originalPrice: null, image: '/images/products/cable.png' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { addToCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // ফিল্টার করা প্রোডাক্ট লিস্ট
  const filteredProducts = allProductsDatabase.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleBuyNow = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
    setSelectedProduct(product);
    setShowCartModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-orange-500 text-gray-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-800">Search</span>
      </nav>

      {/* Top Filter Bar (Show & Sort By) */}
      <div className="bg-white rounded-lg p-3 shadow-2xs border border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Show:</span>
          <select className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-800 focus:outline-none">
            <option value="16">16</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Sort By:</span>
          <select className="border border-gray-300 rounded px-2.5 py-1 bg-white text-gray-800 focus:outline-none">
            <option value="default">Default</option>
            <option value="name_asc">Name (A - Z)</option>
            <option value="name_desc">Name (Z - A)</option>
            <option value="price_asc">Price (Low &gt; High)</option>
            <option value="price_desc">Price (High &gt; Low)</option>
          </select>
        </div>
      </div>

      {/* Product Grid matching the layout */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-3 border border-gray-200/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <Link href={`/product/${product.id}`} className="block relative w-full aspect-square mb-2 p-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </Link>

                <Link href={`/product/${product.id}`}>
                  <h3 className="text-[11px] font-bold text-gray-900 text-center uppercase line-clamp-3 leading-tight mb-2 hover:text-orange-500 transition-colors h-11">
                    {product.name}
                  </h3>
                </Link>
              </div>

              <div className="space-y-2 pt-1">
                <div className="text-center">
                  <span className="text-sm font-extrabold text-[#e11d48]">
                    {product.price.toLocaleString()}৳
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-gray-400 line-through ml-1.5">
                      {product.originalPrice.toLocaleString()}৳
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full py-1.5 bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe] text-xs font-bold rounded flex items-center justify-center transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center space-y-3">
          <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No products found!</h3>
          <p className="text-sm text-gray-500">Sorry, we couldn&apos;t find any products matching &quot;{query}&quot;.</p>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="bg-white rounded-lg p-3 shadow-2xs border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 font-medium">
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700">PRIV</button>
          <button className="px-3 py-1 bg-[#031d42] text-white font-bold rounded">1</button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700">2</button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700">3</button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-700">NEXT</button>
        </div>
        <div className="text-gray-500">
          Showing 1 to 16 of 672 (36 Pages)
        </div>
      </div>

      {/* Success Modal on Buy Now */}
      {showCartModal && selectedProduct && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 relative">
            <button onClick={() => setShowCartModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold mx-auto">
              ✅
            </div>
            <h3 className="font-bold text-gray-900 text-sm">
              You have added <span className="text-orange-500">{selectedProduct.name}</span> to your cart!
            </h3>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/checkout/cart" onClick={() => setShowCartModal(false)} className="bg-[#0070f3] text-white font-bold py-2.5 rounded-lg text-xs text-center">
                VIEW CART
              </Link>
              <Link href="/checkout/onepagecheckout" onClick={() => setShowCartModal(false)} className="bg-[#0070f3] text-white font-bold py-2.5 rounded-lg text-xs text-center">
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6 relative">
      <Suspense fallback={<div className="text-center py-20 font-bold">Loading...</div>}>
        <SearchContent />
      </Suspense>
    </main>
  );
}