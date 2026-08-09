'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages = 66,
  onPageChange,
  totalItems = 1049,
  itemsPerPage = 16,
}: PaginationProps) {
  // পেজিনেশন নম্বরের লিমিট জেনারেট করা (যেমন: ১ থেকে ৯)
  const maxVisiblePages = 9;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="w-full mt-8">
      {/* 🔴 Uncommon Floating Shadow Card Wrapper */}
      <div className="w-full bg-white rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4 border border-gray-100 shadow-[0_10px_30px_-8px_rgba(255,102,0,0.12),0_4px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
        
        {/* Left Side: Navigation & Numbers */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          
          {/* PREV Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-[13px] font-bold tracking-wider text-gray-700 uppercase rounded-lg hover:text-orange-500 hover:bg-orange-50/80 disabled:opacity-30 disabled:hover:text-gray-700 disabled:hover:bg-transparent transition-all duration-200"
          >
            PREV
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {visiblePages.map((page) => {
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`min-w-[30px] h-[30px] px-2.5 flex items-center justify-center text-[13px] font-bold rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_4px_14px_rgba(255,102,0,0.4)] scale-105'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60 hover:-translate-y-0.5'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* NEXT Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-[13px] font-bold tracking-wider text-gray-700 uppercase rounded-lg hover:text-orange-500 hover:bg-orange-50/80 disabled:opacity-30 disabled:hover:text-gray-700 disabled:hover:bg-transparent transition-all duration-200"
          >
            NEXT
          </button>
        </div>

        {/* Right Side: Showing Info Text (Exact Match to Image) */}
        <div className="text-[13px] font-semibold text-gray-600 tracking-tight whitespace-nowrap bg-gray-50/80 px-3.5 py-1.5 rounded-full border border-gray-100">
          Showing <span className="text-gray-900 font-bold">{startItem}</span> to{' '}
          <span className="text-gray-900 font-bold">{endItem}</span> of{' '}
          <span className="text-gray-900 font-bold">{totalItems}</span> ({totalPages} Pages)
        </div>

      </div>
    </div>
  );
}