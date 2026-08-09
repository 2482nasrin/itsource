'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronRight, User, Calendar, Share2, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';

export default function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) return;
    setSubmitted(true);
    setName('');
    setEmail('');
    setComment('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-[#f2f4f8] py-4 sm:py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb matching exact site style */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium flex-wrap">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center">
            <Home className="w-4 h-4 text-gray-600" />
          </Link>
          
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          <Link href="/blog" className="text-blue-600 hover:text-orange-500 transition-colors font-medium">
            Blog
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          
          <span className="text-gray-800 font-medium line-clamp-1">
            {formattedTitle}
          </span>
        </nav>

        {/* Main Content White Container */}
        <article className="bg-white rounded-xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-200/80 space-y-6">
          
          {/* Featured Banner Image */}
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
            <Image 
              src="/images/products/docking-station.png" 
              alt={formattedTitle} 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight">
            {formattedTitle}
          </h1>

          {/* Author, Date & Share Options */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-3 text-xs sm:text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-800 font-semibold">Againsoft</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>April 12, 2026</span>
              </div>
            </div>

            {/* Social Share Icons */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 flex items-center gap-1 mr-1">
                <Share2 className="w-3.5 h-3.5" /> Share:
              </span>
              <button aria-label="Share on Facebook" className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button aria-label="Share on Twitter" className="w-7 h-7 rounded-full bg-sky-400 text-white flex items-center justify-center hover:bg-sky-500 transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </button>
              <button aria-label="Share on LinkedIn" className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </button>
              <button aria-label="Copy link" className="w-7 h-7 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Link2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Article Body Content */}
          <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 pt-2">
              Best Laptop Bags and Accessories in Bangladesh
            </h2>
            <p>
              Laptop bags in Bangladesh cater to the diverse needs of tech-savvy individuals in this vibrant South Asian nation. These bags are designed with a fusion of functionality and style in mind. With a focus on affordability, they come in a variety of sizes, accommodating laptops of different dimensions. Durable materials like nylon, leather, or canvas are often used to ensure longevity and protection against the country&apos;s varying weather conditions.
            </p>
            <p>
              Many laptop bags in Bangladesh also feature additional compartments for documents, chargers, and personal belongings, ensuring efficient organization. Whether you&apos;re a student, professional, or traveler, these bags are readily available in local markets, offering a blend of practicality and affordability for laptop users across the country.
            </p>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 pt-2">
              Types of Laptop Accessories for Every Need and Style
            </h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong className="text-gray-900">Laptop Backpacks:</strong> These are backpack-style bags designed to carry laptops comfortably. They come in various sizes, designs, and materials, suitable for students and professionals.
              </li>
              <li>
                <strong className="text-gray-900">Sleeves and Pouches:</strong> Slim and lightweight protection layers that fit easily inside larger bags or can be carried independently.
              </li>
              <li>
                <strong className="text-gray-900">Briefcases and Messenger Bags:</strong> Classic corporate styles offering professional looks with dedicated padded compartments.
              </li>
            </ol>
          </div>

        </article>

        {/* Comments Section (Compact & Clean Design) */}
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-gray-200/80 space-y-5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Comments
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-500 italic">
            There are no comments for this Article.
          </p>

          <div className="border-t border-gray-100 pt-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">
              Write a comment
            </h3>

            {submitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium">
                ✅ Your comment has been submitted successfully!
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">Your Comment</label>
                <textarea 
                  rows={3}
                  placeholder="Write your comment here..." 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required 
                  className="w-full border border-gray-300 rounded-md p-3 text-xs sm:text-sm focus:outline-none focus:border-blue-600 bg-white text-gray-900 shadow-2xs resize-y"
                ></textarea>
              </div>

              <div className="pt-1">
                <button 
                  type="submit"
                  className="bg-[#0070f3] hover:bg-[#005bb5] text-white font-bold px-6 py-2.5 rounded-md text-xs sm:text-sm transition-all shadow-sm cursor-pointer tracking-wider"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </main>
  );
}