'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, User, Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Finding the Right Fit for Your Budget Laptop Bag and Sleeve in Bangladesh',
    author: 'Againsoft',
    date: 'April 12, 2026',
    description: 'Laptop bags in Bangladesh cater to the diverse needs of tech-savvy individuals in this vibrant South Asian nation.',
    image: '/images/products/docking-station.png', // আপনার সুবিধমত ইমেজ পাথ পরিবর্তন করে নিতে পারেন
    slug: 'finding-the-right-fit-for-your-budget-laptop-bag-and-sleeve',
  },
  {
    id: 2,
    title: 'Protect Your Macbook Accessories in Bangladesh',
    author: 'Againsoft',
    date: 'April 12, 2026',
    description: 'Macbook Cover/ISHIELD - your MacBook’s new best friend. Elevate your style and protect your valuable device in one sleek package.',
    image: '/images/products/docking-station.png',
    slug: 'protect-your-macbook-accessories-in-bangladesh',
  },
  {
    id: 3,
    title: 'Top E-Commerce Websites in Bangladesh: The Ultimate Guide for Online Shoppers',
    author: 'Againsoft',
    date: 'April 12, 2026',
    description: 'Online shopping in Bangladesh is expanding rapidly, with faster delivery, better product authenticity, and improved customer service.',
    image: '/images/products/docking-station.png',
    slug: 'top-ecommerce-websites-in-bangladesh',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb matching the exact site style */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          <span className="text-gray-800 font-medium">
            Blog
          </span>
        </nav>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Blog Image */}
                <Link href={`/blog/${post.slug}`} className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </Link>

                {/* Blog Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* Author & Date Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </div>

              {/* Read More Button */}
              <div className="pt-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-block bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-all shadow-xs tracking-wide"
                >
                  READ MORE ...
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Pagination / Showing Info Bar */}
        <div className="bg-white rounded-xl px-5 py-4 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 font-medium gap-2 mt-6">
          <span>Showing 1 to 3 of 3 (1 Pages)</span>
          {/* যদি পরবর্তীতে পেজিনেশন বাড়াতে চান এখানে কম্পোনেন্ট যুক্ত করতে পারেন */}
        </div>

      </div>
    </main>
  );
}