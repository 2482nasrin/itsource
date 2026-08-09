'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, ShoppingCart, CheckCircle2, Edit3, X, AlertTriangle } from 'lucide-react';
import { FaWhatsapp, FaFacebookMessenger, FaPhoneAlt } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  regularPrice: number;
  status: string;
  productCode: string;
  brand: string;
  model: string;
  keyFeatures: string[];
  images: string[];
  specifications: {
    category: string;
    items: { label: string; value: string }[];
  }[];
  descriptionText: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

const relatedProductsList: RelatedProduct[] = [
  { id: 101, name: 'UGREEN 3-in-1 Magnetic USB-C Card Reader cm898 (65095)', price: 1250, image: '/images/products/cable.png' },
  { id: 102, name: 'WIWU MASTER RFID PASSPORT WALLET', price: 1450, image: '/images/products/bag.png' },
  { id: 103, name: 'UGREEN CM200 (50744) 2 in-1 Out HDMI KVM Switch', price: 3650, image: '/images/products/docking-station.png' },
  { id: 104, name: 'UGREEN 40GBPS M.2 NVME ENCLOSURE D703 (65727)', price: 4200, image: '/images/products/charger-1.png' },
  { id: 105, name: 'UGREEN FineCam Pro 4K Webcam CM930 (75726)', price: 10200, image: '/images/products/charger-2.png' },
];

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id) || 1;

  // 🔴 ডাইনামিক প্রোডাক্ট জেনারেটর: ক্যাটাগরি পেজের যেকোনো আইডিতে ক্লিক করলে তার নাম ও দাম অনুযায়ী ডাইনামিক ডেটা তৈরি হবে
  const product: ProductDetails = {
    id: productId,
    name: productId === 1 
      ? 'UGREEN REVODOK MAX 213 THUNDERBOLT 4 13 IN 1 DOCKING STATION (25054)' 
      : `PREMIUM TECH ACCESSORIES MODEL - ${productId}`,
    price: 650 + (productId * 25),
    regularPrice: 850 + (productId * 25),
    status: 'In Stock',
    productCode: `250${productId}`,
    brand: productId % 2 === 0 ? 'BASEUS' : 'UGREEN',
    model: `Revodok Max ${productId}`,
    keyFeatures: [
      'Wattage: 180 watts',
      'USB Ports: 5 High Speed',
      'Number of Ports: 13 Multi-functional interfaces',
      'Compatible Devices: Universal support for Laptops, MacBooks, and PCs'
    ],
    images: [
      '/images/products/docking-station.png',
      '/images/products/cable.png',
      '/images/products/bag.png',
      '/images/products/charger-1.png',
    ],
    specifications: [
      {
        category: 'General Information',
        items: [
          { label: 'Compatible Device', value: 'MacBook Pro, MacBook Air, Dell XPS, Surface Pro, and more' },
          { label: 'Color', value: 'Dark Gray' }
        ]
      },
      {
        category: 'Technical Specifications',
        items: [
          { label: 'Number Of Ports', value: '13-in-1 Versatile Hub' },
          { label: 'Hardware Interface', value: 'USB 3.1 Type A, DisplayPort, Type-C, HDMI' }
        ]
      }
    ],
    descriptionText: `This is the official high-performance description for product ID ${productId}. It provides exceptional speed, durability, and multi-device connectivity designed for modern professionals.`
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specification' | 'description' | 'reviews'>('specification');
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [showCartModal, setShowCartModal] = useState(false);

  const { addToCart, cart } = useCart();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const hasSpecialPrice = product.price < product.regularPrice;

  const scrollToSection = (id: string, tabName: 'specification' | 'description' | 'reviews') => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleBuyNowClick = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
    }, quantity);

    setShowCartModal(true);
  };

  const currentCartItem = cart.find(item => item.id === product.id);
  const cartQuantity = currentCartItem ? currentCartItem.quantity : quantity;
  const cartTotal = product.price * cartQuantity;

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/category/accessories" className="hover:text-orange-500 transition-colors text-blue-600">
            Accessories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#0a3a64] font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        {/* Main Product Info Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Left Side: Images & Carousel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full aspect-square bg-white border border-gray-200 rounded-xl overflow-hidden p-4 flex items-center justify-center shadow-xs">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div className="relative">
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 flex-shrink-0 border rounded-lg overflow-hidden bg-white p-1 transition-all ${
                        selectedImage === img 
                          ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-xs' 
                          : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Thumb ${index}`} fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Product Meta & Buy Section */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-xl sm:text-[16px] font-bold text-gray-800 leading-snug">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm pt-1">
                <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md font-semibold border border-gray-200 flex items-center gap-2">
                  <span className="text-gray-500 font-normal">Price:</span> 
                  {hasSpecialPrice ? (
                    <>
                      <strong className="text-gray-900">{product.price.toLocaleString()}৳</strong>
                      <span className="text-gray-400 line-through font-normal text-xs">
                        {product.regularPrice.toLocaleString()}৳
                      </span>
                    </>
                  ) : (
                    <strong className="text-gray-900">{product.regularPrice.toLocaleString()}৳</strong>
                  )}
                </span>

                <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Status: {product.status}
                </span>

                <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md font-semibold border border-gray-200">
                  <span className="text-gray-500 font-normal">Product Code:</span> <strong className="text-gray-900">{product.productCode}</strong>
                </span>

                <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-md font-semibold border border-gray-200">
                  <span className="text-gray-500 font-normal">Brand:</span> <strong className="text-gray-900">{product.brand}</strong>
                </span>
              </div>

              <div>
                <span className="inline-block bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium">
                  Model: <span className="font-bold text-gray-900">{product.model}</span>
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm sm:text-[18px] mb-3 mt-1">Key Features</h3>
                <ul className="text-xs sm:text-[16px] text-gray-600 mb-3">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 mb-2.5 last:mb-0">
                      <span className="text-orange-500 font-bold">•</span> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollToSection('tab-navigation-bar', 'specification')}
                  className="text-orange-500 hover:text-orange-500 text-xs sm:text-sm font-semibold underline underline-offset-4 cursor-pointer transition-colors"
                >
                  View More Info
                </button>
              </div>

              {/* Chat Through */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-[16px] font-bold text-gray-700 capitalized tracking-wide block">Chat Through</span>
                <div className="flex flex-wrap gap-2.5">
                  <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-md transition-colors shadow-xs">
                    <FaWhatsapp className="w-4 h-4" /> Whatsapp
                  </a>
                  <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-md transition-colors shadow-xs">
                    <FaFacebookMessenger className="w-4 h-4" /> Messenger
                  </a>
                  <a href="tel:01919827396" className="flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-md transition-colors shadow-xs">
                    <FaPhoneAlt className="w-3.5 h-3.5" /> 01919827396
                  </a>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-[16px] font-bold text-gray-700 capitalized tracking-wide block">Payment Options</span>
                <div className="border border-orange-500 rounded-md p-4 bg-orange-50/20 max-w-md space-y-1">
                  <div className="text-xl sm:text-[20px] font-bold text-[#e11d48] flex items-center gap-3">
                    {hasSpecialPrice ? (
                      <>
                        <span>{product.price.toLocaleString()}৳</span>
                        <span className="text-gray-400 line-through text-sm font-normal">
                          {product.regularPrice.toLocaleString()}৳
                        </span>
                      </>
                    ) : (
                      <span>{product.regularPrice.toLocaleString()}৳</span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-800">
                    Cash Discount Price
                  </div>
                  <div className="text-xs text-gray-500">
                    Online / Cash Payment
                  </div>
                </div>
              </div>

              {/* Quantity Counter & Buy Now Button */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden shadow-2xs h-11">
                  <button onClick={handleDecrement} className="px-3 text-gray-600 hover:bg-gray-100 font-bold transition-colors text-base h-full flex items-center justify-center">-</button>
                  <span className="px-4 text-sm font-bold text-gray-900 min-w-[36px] text-center">{quantity}</span>
                  <button onClick={handleIncrement} className="px-3 text-gray-600 hover:bg-gray-100 font-bold transition-colors text-base h-full flex items-center justify-center">+</button>
                </div>

                <button 
                  onClick={handleBuyNowClick}
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold h-11 px-6 rounded-md text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" /> Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section: Tabs & Stacked Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Clickable Navigation Tabs */}
            <div id="tab-navigation-bar" className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 flex flex-wrap gap-2 scroll-mt-24">
              <button
                onClick={() => scrollToSection('spec-section', 'specification')}
                className={`px-5 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-colors ${
                  activeTab === 'specification'
                    ? 'bg-[#f97316] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Specification
              </button>
              <button
                onClick={() => scrollToSection('desc-section', 'description')}
                className={`px-5 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-colors ${
                  activeTab === 'description'
                    ? 'bg-[#f97316] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => scrollToSection('review-section', 'reviews')}
                className={`px-5 py-2.5 rounded-lg font-bold text-sm sm:text-base transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-[#f97316] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews (1)
              </button>
            </div>

            {/* 1. SPECIFICATION SECTION */}
            <div id="spec-section" className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-6 scroll-mt-24">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Specification:</h2>
              
              {product.specifications.map((spec, sIdx) => (
                <div key={sIdx} className="space-y-2 border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-[#fdf2e9] text-[#c2410c] font-bold px-4 py-2.5 text-sm sm:text-base border-b border-gray-200">
                    {spec.category}
                  </div>
                  <div className="divide-y divide-gray-200">
                    {spec.items.map((item, iIdx) => (
                      <div key={iIdx} className="grid grid-cols-1 sm:grid-cols-12 text-sm sm:text-base">
                        <div className="sm:col-span-4 p-3 bg-gray-50 text-gray-700 font-medium border-r border-gray-200">
                          {item.label}
                        </div>
                        <div className="sm:col-span-8 p-3 text-gray-900 font-normal">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 2. DESCRIPTION SECTION */}
            <div id="desc-section" className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4 scroll-mt-24">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Description:</h2>
              <h3 className="font-bold text-gray-800 text-base sm:text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.descriptionText}
              </p>
            </div>

            {/* 3. REVIEWS SECTION */}
            <div id="review-section" className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-6 scroll-mt-24">
              
              <div className="space-y-1 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900">Reviews (1) :</h2>
                <p className="text-xs sm:text-[16px] text-gray-500">Get specific details about this product from customers who own it.</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">Tanvir Ahmed</span>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Awesome product! Very fast delivery and genuine quality.</p>
              </div>

              <div className="text-center pt-2 space-y-2">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">Write your review</h4>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-blue-500" />
                  <span className="border-b border-blue-600 pb-0.5">click here</span>
                </button>
              </div>

              {showReviewForm && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name*</label>
                    <input type="text" placeholder="Your Name*" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Review*</label>
                    <textarea rows={4} placeholder="Your Review*" className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm bg-white resize-none"></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button onClick={() => { alert('Review submitted!'); setShowReviewForm(false); }} className="bg-[#0070f3] text-white font-bold text-xs px-6 py-2.5 rounded-md">CONTINUE</button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Side: Related Product Section */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 space-y-4 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Related Product</h2>
            
            <div className="space-y-3">
              {relatedProductsList.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/product/${item.id}`}
                  className="flex items-center gap-3 p-2.5 rounded-md border border-gray-200 hover:border-orange-500 transition-all bg-white group"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-lg p-1 border border-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-[14px] text-black group-hover:text-orange-500 transition-colors line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-sm font-extrabold text-[#e11d48] mt-1 block">
                      {item.price > 0 ? `${item.price.toLocaleString()}৳` : '0৳'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Buy Now Popup Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-3 sm:p-3 shadow-2xl relative space-y-6">
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

              <Link href={`/product/${product.id}`} onClick={() => setShowCartModal(false)}>
                <h3 className="text-center text-gray-900 text-sm sm:text-base leading-snug transition-colors">
                  You have added <span className="text-orange-500">{product.name}</span> to your shopping cart!
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

    </main>
  );
}