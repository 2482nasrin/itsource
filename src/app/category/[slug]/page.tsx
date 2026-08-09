'use client';

import { useState, use, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, SlidersHorizontal, ShoppingCart, X } from 'lucide-react';
import FilterSidebar from '@/components/category/FilterSidebar';
import Pagination from '@/components/category/Pagination';
import CategorySeoSection from '@/components/category/CategorySeoSection';
import { CategoryProduct } from '@/types/category';
import { useCart } from '@/context/CartContext';

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
      { title: 'KVM SWITCH', items: ['FJGEAR', 'MT-VIKI', 'UGREEN', 'UNITEK'] },
      { title: 'MEMORY CARD' },
      { title: 'MOUSE', items: ['WIRELESS MOUSE', 'GAMING MOUSE', 'WIRED MOUSE'] },
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

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s*&\s*/g, '-and-')
    .replace(/\s+/g, '-');
};

const formatTitleFromSlug = (slug: string) => {
  return slug
    .replace(/-and-/g, ' & ')
    .replace(/-/g, ' ');
};

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const categoryProductsDatabase: Record<string, CategoryProduct[]> = {
  'accessories': Array.from({ length: 45 }).map((_, index) => ({
    id: index + 1,
    name: index % 3 === 0
      ? 'UGREEN MULTI-FUNCTIONAL HIGH SPEED ACCESSORIES DEVICE'
      : index % 3 === 1
      ? 'BASEUS PREMIUM QUALITY SMART TECH PRODUCT'
      : 'WIWU ERGONOMIC HEAVY DUTY ACCESSORIES BAG',
    image: '/images/products/docking-station.png',
    price: 650 + (index * 25),
    originalPrice: index % 2 === 0 ? 850 + (index * 25) : undefined,
    saveAmount: index % 2 === 0 ? 200 : undefined,
    inStock: true,
  })),
  'accessories-bag': Array.from({ length: 12 }).map((_, index) => ({
    id: 100 + index + 1,
    name: `UGREEN HARD DRIVE STORAGE BAG MODEL ${index + 1}`,
    image: '/images/products/docking-station.png',
    price: 750 + (index * 30),
    originalPrice: 1050,
    saveAmount: 300,
    inStock: true,
  })),
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('default');

  // Buy Now Popup Modal States
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CategoryProduct | null>(null);

  // Compare Popup Modal States
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareProduct, setCompareProduct] = useState<CategoryProduct | null>(null);

  const { addToCart, cart } = useCart();

  // 🔴 ৬ সেকেন্ড পর পপআপ অটো বন্ধ হওয়ার ইফেক্ট (Compare Modal)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCompareModal) {
      timer = setTimeout(() => {
        setShowCompareModal(false);
      }, 6000); // ৬ সেকেন্ড
    }
    return () => clearTimeout(timer);
  }, [showCompareModal]);

  // 🔴 ৬ সেকেন্ড পর পপআপ অটো বন্ধ হওয়ার ইফেক্ট (Cart Modal)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCartModal) {
      timer = setTimeout(() => {
        setShowCartModal(false);
      }, 6000); // ৬ সেকেন্ড
    }
    return () => clearTimeout(timer);
  }, [showCartModal]);

  const currentFormattedSlug = formatTitleFromSlug(slug);

  const matchedMainMenu = menuData.find(
    (menu) => createSlug(menu.title) === slug
  );

  let parentCategoryName = matchedMainMenu ? matchedMainMenu.title : '';
  let subCategoriesList: string[] = [];

  if (matchedMainMenu) {
    subCategoriesList = matchedMainMenu.subCategories.map((sub) => sub.title);
  } else {
    for (const menu of menuData) {
      for (const sub of menu.subCategories) {
        if (createSlug(sub.title) === slug) {
          parentCategoryName = menu.title;
          subCategoriesList = sub.items || menu.subCategories.map((s) => s.title);
          break;
        }
        if (sub.items) {
          for (const item of sub.items) {
            if (createSlug(item) === slug) {
              parentCategoryName = menu.title;
              subCategoriesList = sub.items;
              break;
            }
          }
        }
      }
      if (parentCategoryName) break;
    }
  }

  const currentSlugKey = slug.toLowerCase();
  const categoryProducts = categoryProductsDatabase[currentSlugKey] || 
    (parentCategoryName.toLowerCase() === 'accessories' ? categoryProductsDatabase['accessories'] : []);

  const displayCategoryName = toTitleCase(currentFormattedSlug);
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const currentProducts = categoryProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const priceListItems = categoryProducts.slice(0, 15).map((p) => ({
    name: `${displayCategoryName} - ${p.name}`,
    price: p.price,
  }));

  const isSameAsParent = parentCategoryName.toLowerCase() === currentFormattedSlug.toLowerCase();

  const handleBuyNowClick = (product: CategoryProduct) => {
    setSelectedProduct(product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }, 1);
    setShowCartModal(true);
  };

  const handleCompareClick = (product: CategoryProduct) => {
    setCompareProduct(product);
    setShowCompareModal(true);
  };

  const currentCartItem = cart.find(item => item.id === selectedProduct?.id);
  const cartQuantity = currentCartItem ? currentCartItem.quantity : 1;
  const cartTotal = selectedProduct ? selectedProduct.price * cartQuantity : 0;

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-4 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          {parentCategoryName && !isSameAsParent && (
            <>
              <Link 
                href={`/category/${createSlug(parentCategoryName)}`} 
                className="hover:text-orange-500 transition-colors text-blue-600 font-medium"
              >
                {toTitleCase(parentCategoryName)}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </>
          )}
          
          <span className="text-[#0a3a64] font-medium">
            {displayCategoryName}
          </span>
        </nav>

        {/* Dynamic Category Header Box */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            {displayCategoryName} Price In Bangladesh 2026
          </h1>
          <p className="text-[15px] text-gray-500 mt-1">
            Explore {categoryProducts.length} models with authentic warranty at the best price in IT SOURCE.
          </p>
        </div>

        {/* Sub-Category Chips Wrapper */}
        {subCategoriesList.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-5 text-[13px] font-medium text-gray-700">
            {subCategoriesList.map((subCat) => {
              const subCatSlug = createSlug(subCat);
              const isSelected = selectedSubCategory === subCat;

              return (
                <Link
                  key={subCat}
                  href={`/category/${subCatSlug}`}
                  onClick={() => setSelectedSubCategory(subCat)}
                  className={`px-4 py-1.5 rounded-full border transition-all duration-200 shadow-2xs ${
                    isSelected || slug === subCatSlug
                      ? 'bg-orange-500 text-white border-orange-500 font-bold'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-orange-500 hover:text-orange-500'
                  }`}
                >
                  {toTitleCase(subCat)}
                </Link>
              );
            })}
          </div>
        )}

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 items-start">
          
          {/* Left Accordion Sidebar Filter */}
          <div className="hidden lg:block sticky top-4">
            <FilterSidebar />
          </div>

          {/* Right Area */}
          <div className="flex-1 w-full space-y-4">
            
            {/* Top Bar */}
            <div className="bg-white rounded-xl p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[16px] font-bold text-gray-900">
                {displayCategoryName}
              </h2>

              <div className="flex items-center gap-4 text-[13px] font-medium text-gray-600 ml-auto">
                <div className="flex items-center gap-1.5">
                  <span>Show:</span>
                  <select 
                    value={itemsPerPage} 
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-800 text-[16px] focus:outline-none focus:border-orange-500"
                  >
                    <option value={16}>16</option>
                    <option value={20}>20</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                    <option value={75}>75</option>
                    <option value={90}>90</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span>Sort By:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-800 text-[13px] focus:outline-none focus:border-orange-500"
                  >
                    <option value="default">Default</option>
                    <option value="name-az">Name (A - Z)</option>
                    <option value="name-za">Name (Z - A)</option>
                    <option value="price-low">Price (Low &gt; High)</option>
                    <option value="price-high">Price (High &gt; Low)</option>
                    <option value="rating-high">Rating (Highest)</option>
                    <option value="rating-low">Rating (Lowest)</option>
                    <option value="model-az">Model (A - Z)</option>
                    <option value="model-za">Model (Z - A)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
              <button
                onClick={() => setShowMobileFilter(true)}
                className="text-xs font-bold text-gray-800"
              >
                ⚙️ Filter Options
              </button>
              <span className="text-xs text-gray-500">
                Showing {currentProducts.length} of {categoryProducts.length}
              </span>
            </div>

            {/* Conditional Product Rendering */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                  {currentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex flex-col justify-between bg-white rounded-md p-3.5 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200"
                    >
                      {product.saveAmount && (
                        <div className="absolute top-0 right-0 z-10 bg-[#e11d48] text-white text-[11px] font-bold px-2.5 py-1 rounded-tr-xl rounded-bl-xl shadow-xs">
                          Save: {product.saveAmount}৳
                        </div>
                      )}

                      <div>
                        <Link href={`/product/${product.id}`} className="block relative w-full aspect-square mb-3 overflow-hidden p-1">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 50vw, 25vw"
                          />
                        </Link>

                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-[13px] font-bold text-gray-900 text-center uppercase tracking-tight line-clamp-2 leading-snug mb-3 hover:text-orange-500 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                      </div>

                      <div className="space-y-2 text-center pt-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-[16px] font-bold text-[#e11d48]">
                            {product.price > 0 ? `${product.price.toLocaleString()}৳` : '0৳'}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[16px] text-gray-400 line-through font-medium">
                              {product.originalPrice.toLocaleString()}৳
                            </span>
                          )}
                        </div>

                        {product.inStock ? (
                          <button 
                            onClick={() => handleBuyNowClick(product)}
                            className="w-full py-2 bg-[#e0e7ff] text-[#3730a3] hover:text-[white] hover:bg-[#3749bb] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ShoppingCart className="w-5 h-5" /> Buy Now
                          </button>
                        ) : (
                          <button disabled className="w-full py-2 bg-red-100 text-red-600 text-[13px] font-bold rounded-lg flex items-center justify-center gap-1 cursor-not-allowed">
                            <span>🚫</span> Out of stock
                          </button>
                        )}

                        <button 
                          onClick={() => handleCompareClick(product)}
                          className="w-full text-[13px] font-bold text-gray-800 hover:text-orange-500 flex items-center justify-center gap-1.5 transition-colors pt-0.5 cursor-pointer"
                        >
                          <SlidersHorizontal className="w-4 h-4" /> Compare
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  totalItems={categoryProducts.length}
                  itemsPerPage={itemsPerPage}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 sm:p-16 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-center my-4">
                <p className="text-sm sm:text-base text-gray-600 font-normal">
                  No products match the selected filters.
                </p>
              </div>
            )}

            {/* SEO Content & Price List Component */}
            <CategorySeoSection 
              categoryName={displayCategoryName} 
              priceList={priceListItems} 
            />

          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full p-4 overflow-y-auto space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-gray-900 text-sm">Filter Options</h3>
              <button onClick={() => setShowMobileFilter(false)} className="text-base font-bold text-gray-500">✕</button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setShowMobileFilter(false)}
              className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Buy Now Popup Modal */}
      {showCartModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-3 sm:p-3 shadow-2xl relative animate-scaleUp space-y-6">
            
            <button 
              onClick={() => setShowCartModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            <>
              <div className="flex justify-center py-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold border border-emerald-200 shadow-inner">
                  ✅
                </div>
              </div>

              <Link href={`/product/${selectedProduct.id}`} onClick={() => setShowCartModal(false)}>
                <h3 className="text-center text-gray-900 text-sm sm:text-base leading-snug transition-colors">
                  You have added <span className="text-orange-500"> {selectedProduct.name} </span> to your shopping cart!
                </h3>
              </Link>

              <div className="border border-gray-200 rounded-md overflow-hidden divide-y divide-gray-200 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50/50">
                  <span className="text-gray-600 font-medium">Cart Quantity:</span>
                  <span className="font-bold text-gray-900">{cartQuantity}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50/50">
                  <span className="text-gray-600 font-medium">Cart Total:</span>
                  <span className="font-extrabold text-gray-900">{cartTotal.toLocaleString()}৳</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Link 
                  href="/checkout/cart"
                  onClick={() => setShowCartModal(false)}
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-2.5 px-4 rounded-md text-xs sm:text-sm text-center transition-all shadow-xs"
                >
                  VIEW CART
                </Link>
                <Link 
                  href="/checkout/onepagecheckout"
                  onClick={() => setShowCartModal(false)}
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-2.5 px-4 rounded-md text-xs sm:text-sm text-center transition-all shadow-xs"
                >
                  CONFIRM ORDER
                </Link>
              </div>
            </>

          </div>
        </div>
      )}

      {/* Compare Success Popup Modal (Auto closes after 6 seconds) */}
      {showCompareModal && compareProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative space-y-5">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowCompareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>

            {/* Success Content */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed pr-6">
                Success: You have added <span className="text-orange-500 font-semibold">{compareProduct.name}</span> to your product comparison!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Link 
                href="/product/compare"
                onClick={() => setShowCompareModal(false)}
                className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold py-2 px-5 rounded text-xs sm:text-sm transition-all shadow-2xs"
              >
                Compare Now
              </Link>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-2 px-5 rounded text-xs sm:text-sm transition-all shadow-2xs cursor-pointer"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}