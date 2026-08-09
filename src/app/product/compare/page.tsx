'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, X, Search, Printer, Share2 } from 'lucide-react';

interface CompareProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  model: string;
  brand: string;
  availability: string;
  rating: string;
  frequency?: string;
  connectionType?: string;
  cableLength?: string;
  connector?: string;
  drivers?: string;
  color?: string;
  warranty?: string;
}

const allProductsPool: CompareProduct[] = [
  {
    id: 1,
    name: 'Asus NUC 14 Essential Intel N97 Portable Mini PC',
    image: '/images/products/docking-station.png',
    price: 27000,
    model: 'NUC 14 Essential',
    brand: 'Asus',
    availability: 'In Stock',
    rating: '0/5 (0 Reviews)',
    frequency: '-',
    connectionType: '-',
    cableLength: '-',
    connector: '-',
    drivers: '-',
    color: 'Black',
    warranty: '3 Years',
  },
  {
    id: 2,
    name: 'Jiayou Bass 6 Wired 3.5mm Earphone',
    image: '/images/products/docking-station.png',
    price: 90,
    model: 'Bass 6',
    brand: 'Jiayou',
    availability: 'In Stock',
    rating: '0/5 (0 Reviews)',
    frequency: '20Hz-20KHz',
    connectionType: 'Wired 3.5mm',
    cableLength: '1 m',
    connector: '3.5mm',
    drivers: '10mm',
    color: 'Black',
    warranty: 'No Warranty',
  },
  {
    id: 3,
    name: 'CHARG C1C 1 Meter USB to Type C Cable',
    image: '/images/products/docking-station.png',
    price: 100,
    model: 'C1C',
    brand: 'CHARG',
    availability: 'In Stock',
    rating: '0/5 (0 Reviews)',
    frequency: '-',
    connectionType: 'USB to Type C',
    cableLength: '1 m',
    connector: 'Type-C',
    drivers: '-',
    color: 'White',
    warranty: '6 Months',
  },
  {
    id: 4,
    name: 'HP GT53 90-ml Black Original Ink Bottle',
    image: '/images/products/docking-station.png',
    price: 1000,
    model: 'GT53',
    brand: 'HP',
    availability: 'In Stock',
    rating: '0/5 (0 Reviews)',
    frequency: '-',
    connectionType: '-',
    cableLength: '-',
    connector: '-',
    drivers: '-',
    color: 'Black',
    warranty: 'Original',
  },
];

export default function ComparePage() {
  const [comparedProducts, setComparedProducts] = useState<CompareProduct[]>([]);

  const [searchQueries, setSearchQueries] = useState<Record<number, string>>({});
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [emptySearch1, setEmptySearch1] = useState('');
  const [emptySearch2, setEmptySearch2] = useState('');
  const [dropdown1Active, setDropdown1Active] = useState(false);
  const [dropdown2Active, setDropdown2Active] = useState(false);

  const removeProduct = (id: number) => {
    setComparedProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProductToSlot = (slotIndex: number, product: CompareProduct) => {
    if (comparedProducts.some(p => p.id === product.id)) return;
    const updated = [...comparedProducts];
    updated[slotIndex] = product;
    setComparedProducts(updated);
    setActiveDropdown(null);
    setSearchQueries({ ...searchQueries, [slotIndex]: '' });
  };

  const handleEmptySearchSelect = (product: CompareProduct) => {
    if (comparedProducts.some(p => p.id === product.id) || comparedProducts.length >= 4) return;
    setComparedProducts([...comparedProducts, product]);
    setEmptySearch1('');
    setEmptySearch2('');
    setDropdown1Active(false);
    setDropdown2Active(false);
  };

  const emptySlotsCount = Math.max(0, 4 - comparedProducts.length);
  const totalColumns = comparedProducts.length + (emptySlotsCount > 0 ? 1 : 0);

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-orange-500 flex items-center">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-800 font-medium">Product Comparison</span>
        </nav>

        {/* Top Header Box */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Product Comparison</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Find and select products to see the differences and similarities between them
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#3b49df] hover:bg-[#2f3bb3] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Main Compare Content Area */}
        {comparedProducts.length === 0 ? (
          /* ⚪ White Card Container matching Login/Register page style */
          <div className="flex justify-center items-center py-10">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 max-w-lg w-full text-center space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              
              <h3 className="font-bold text-[#0048ad] text-base sm:text-lg tracking-tight">
                Product Comparison
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                You have not chosen any products to compare.
              </p>
              
              <div className="space-y-3.5">
                {/* Search Input 1 */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search and Select Product"
                    value={emptySearch1}
                    onChange={(e) => {
                      setEmptySearch1(e.target.value);
                      setDropdown1Active(true);
                    }}
                    onFocus={() => setDropdown1Active(true)}
                    className="w-full bg-[#f4f7ff] border border-gray-300 rounded-md px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 pr-9 text-gray-800 shadow-2xs"
                  />
                  <Search className="absolute right-3.5 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  {dropdown1Active && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-48 overflow-y-auto text-left">
                      {allProductsPool
                        .filter(p => p.name.toLowerCase().includes(emptySearch1.toLowerCase()))
                        .map(item => (
                          <div 
                            key={item.id}
                            onClick={() => handleEmptySearchSelect(item)}
                            className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-none"
                          >
                            {item.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Search Input 2 */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search and Select Product"
                    value={emptySearch2}
                    onChange={(e) => {
                      setEmptySearch2(e.target.value);
                      setDropdown2Active(true);
                    }}
                    onFocus={() => setDropdown2Active(true)}
                    className="w-full bg-[#f4f7ff] border border-gray-300 rounded-md px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 pr-9 text-gray-800 shadow-2xs"
                  />
                  <Search className="absolute right-3.5 top-3 w-4 h-4 text-gray-400 pointer-events-none" />

                  {dropdown2Active && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-48 overflow-y-auto text-left">
                      {allProductsPool
                        .filter(p => p.name.toLowerCase().includes(emptySearch2.toLowerCase()))
                        .map(item => (
                          <div 
                            key={item.id}
                            onClick={() => handleEmptySearchSelect(item)}
                            className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-none"
                          >
                            {item.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (allProductsPool.length > 0) setComparedProducts([allProductsPool[0]]);
                }}
                className="w-full py-3 bg-[#0070f3] hover:bg-[#005bb5] text-white rounded-md text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer tracking-wide"
              >
                View Comparison
              </button>
            </div>
          </div>
        ) : (
          /* Active Comparison Table Grid */
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm">
                <tbody>
                  
                  {/* Top Slot Header Row */}
                  <tr className="border-b border-gray-200 bg-gray-50/50">
                    <td className="p-4 font-bold text-gray-700 w-48 align-middle">
                      You can add Max 4 Products
                    </td>
                    
                    {comparedProducts.map((product, idx) => (
                      <td key={product.id} className="p-4 w-[260px] min-w-[260px] align-top relative">
                        <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs relative flex flex-col justify-between h-[320px]">
                          
                          {/* Search / Replace Input at the Top */}
                          <div className="relative">
                            <input 
                              type="text" 
                              placeholder="Search and Select Pro..."
                              value={searchQueries[idx] || ''}
                              onChange={(e) => {
                                setSearchQueries({ ...searchQueries, [idx]: e.target.value });
                                setActiveDropdown(idx);
                              }}
                              onFocus={() => setActiveDropdown(idx)}
                              className="w-full bg-gray-50 border border-gray-300 rounded-md px-3.5 py-2 text-xs focus:outline-none focus:border-blue-600 pr-8"
                            />
                            <button onClick={() => removeProduct(product.id)} className="absolute right-2.5 top-2 text-gray-400 hover:text-red-500 cursor-pointer">
                              <X className="w-4 h-4" />
                            </button>

                            {/* Dropdown Suggestions */}
                            {activeDropdown === idx && (
                              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-48 overflow-y-auto">
                                {allProductsPool
                                  .filter(p => p.name.toLowerCase().includes((searchQueries[idx] || '').toLowerCase()))
                                  .map(item => (
                                    <div 
                                      key={item.id}
                                      onClick={() => addProductToSlot(idx, item)}
                                      className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-none"
                                    >
                                      {item.name}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          {/* Product Image */}
                          <div className="relative w-full h-32 bg-white rounded-lg p-2 flex items-center justify-center">
                            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                          </div>

                          {/* Product Title */}
                          <Link href={`/product/${product.id}`} className="font-bold text-gray-900 hover:text-orange-500 transition-colors line-clamp-2 block text-center text-xs sm:text-sm h-9">
                            {product.name}
                          </Link>

                          {/* Price */}
                          <div className="text-base font-extrabold text-[#e11d48] text-center pt-1">
                            {product.price.toLocaleString()}৳
                          </div>
                        </div>
                      </td>
                    ))}

                    {/* Empty slot if less than 4 */}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && (
                      <td className="p-4 w-[260px] min-w-[260px] align-top">
                        <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-300 text-center flex flex-col items-start justify-start h-[320px] relative">
                          
                          <div className="relative w-full">
                            <input 
                              type="text" 
                              placeholder="Search and Select Product"
                              value={emptySearch1}
                              onChange={(e) => {
                                setEmptySearch1(e.target.value);
                                setDropdown1Active(true);
                              }}
                              onFocus={() => setDropdown1Active(true)}
                              className="w-full bg-white border border-gray-300 rounded-md px-3.5 py-2 text-xs focus:outline-none focus:border-blue-600 pr-8 text-gray-600"
                            />
                            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />

                            {dropdown1Active && (
                              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-48 overflow-y-auto text-left">
                                {allProductsPool
                                  .filter(p => p.name.toLowerCase().includes(emptySearch1.toLowerCase()))
                                  .map(item => (
                                    <div 
                                      key={item.id}
                                      onClick={() => handleEmptySearchSelect(item)}
                                      className="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-none"
                                    >
                                      {item.name}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          <div className="w-full flex-1 flex items-center justify-center">
                            <p className="text-xs text-gray-400 font-medium">Find and select product to compare</p>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>

                  {/* Model */}
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Model</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800 font-medium">{p.model}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Brand */}
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Brand</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800 font-medium">{p.brand}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Availability */}
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Availability</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-emerald-600 font-semibold">{p.availability}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Rating */}
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Rating</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-amber-600 font-medium">★ {p.rating}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Main Feature Header */}
                  <tr className="bg-gray-100/80 border-b border-gray-200">
                    <td colSpan={totalColumns + 1} className="p-3 font-bold text-[#0048ad]">
                      Main Feature
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Frequency</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.frequency || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Connection Type</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.connectionType || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Physical Specification Header */}
                  <tr className="bg-gray-100/80 border-b border-gray-200">
                    <td colSpan={totalColumns + 1} className="p-3 font-bold text-[#0048ad]">
                      Physical Specification
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Cable length</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.cableLength || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Connector</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.connector || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Drivers</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.drivers || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Color</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.color || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Warranty Header */}
                  <tr className="bg-gray-100/80 border-b border-gray-200">
                    <td colSpan={totalColumns + 1} className="p-3 font-bold text-[#0048ad]">
                      Warranty
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold text-gray-700 bg-gray-50">Warranty</td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-3 text-gray-800">{p.warranty || '-'}</td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                  {/* Buy Now Buttons Row */}
                  <tr>
                    <td className="p-4 bg-gray-50"></td>
                    {comparedProducts.map(p => (
                      <td key={p.id} className="p-4">
                        <Link 
                          href="/checkout/onepagecheckout"
                          className="block w-full bg-[#3b49df] hover:bg-[#2f3bb3] text-white font-bold py-2.5 rounded-lg text-xs text-center transition-all shadow-2xs"
                        >
                          Buy Now
                        </Link>
                      </td>
                    ))}
                    {emptySlotsCount > 0 && comparedProducts.length < 4 && <td></td>}
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}