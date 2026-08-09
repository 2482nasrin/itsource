'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0b101d] text-gray-300 pt-10 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          
          {/* Column 1: Shop Address (No borders under items) */}
          <div className="flex flex-col">
            <h3 className="text-white text-[14px] font-bold tracking-wider uppercase mb-5">
              SHOP ADDRESS
            </h3>
            <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
              Shop # 331, Level # 03, Multiplan Center,<br />
              New Elephant Road, Dhaka-1205
            </p>
            <div className="flex items-center space-x-3 mt-auto">
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image 
                  src="/images/bcs-logo.png" 
                  alt="BCS Member" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
              <div className="w-12 h-12 relative flex items-center justify-center">
                <Image 
                  src="/images/ecsl-logo.png" 
                  alt="ECSL Member" 
                  width={60} 
                  height={60} 
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="text-white text-[14px] font-bold tracking-wider uppercase mb-5">
              ABOUT US
            </h3>
            <ul className="text-[14px]">
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/about" className="hover:text-orange-500 transition-colors block">
                  About Us
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/shipping" className="hover:text-orange-500 transition-colors block">
                  Shipping & delivery
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/returns" className="hover:text-orange-500 transition-colors block">
                  Returns
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/warranty" className="hover:text-orange-500 transition-colors block">
                  Warranty
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/blog" className="hover:text-orange-500 transition-colors block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white text-[14px] font-bold tracking-wider uppercase mb-5">
              SUPPORT
            </h3>
            <ul className="text-[14px]">
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/payments" className="hover:text-orange-500 transition-colors block">
                  Payments
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/services" className="hover:text-orange-500 transition-colors block">
                  Services
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/terms" className="hover:text-orange-500 transition-colors block">
                  Terms & Condition
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/privacy" className="hover:text-orange-500 transition-colors block">
                  Privacy
                </Link>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <Link href="/brands" className="hover:text-orange-500 transition-colors block">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-white text-[14px] font-bold tracking-wider uppercase mb-5">
              CONTACT US
            </h3>
            <ul className="text-[14px]">
              <li className="border-b border-gray-800/80 py-2">
                <a href="tel:01919827396" className="flex items-center space-x-3 hover:text-orange-500 transition-colors">
                  <FaPhoneAlt className="w-[14px] h-[14px] text-white" />
                  <span>01919827396</span>
                </a>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <a href="tel:01603453926" className="flex items-center space-x-3 hover:text-orange-500 transition-colors">
                  <FaPhoneAlt className="w-[14px] h-[14px] text-white" />
                  <span>01603453926</span>
                </a>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <a href="mailto:sales@itsource-bd.com" className="flex items-center space-x-3 hover:text-orange-500 transition-colors">
                  <FaEnvelope className="w-[14px] h-[14px] text-white" />
                  <span>sales@itsource-bd.com</span>
                </a>
              </li>
              <li className="border-b border-gray-800/80 py-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-orange-500 transition-colors">
                  <div className="w-[18px] h-[18px] bg-white rounded-full flex items-center justify-center">
                    <FaFacebookF className="w-[11px] h-[11px] text-[#0b101d]" />
                  </div>
                  <span>Facebook</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="border-t border-gray-800/80 pt-6 text-center text-[14px] text-gray-400">
          <p>
            © 2026, IT Source, All Rights Reserved | Develop by{' '}
            <a 
              href="https://againsoft.com/" 
              className="text-blue-400 hover:underline font-medium" target="_blank"
            >
              Againsoft
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}