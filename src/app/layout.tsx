import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import BottomNav from '@/components/header/BottomNav';
import Footer from '@/components/footer/Footer';
import { CartProvider } from '@/context/CartContext'; // কার্ট কন্টেক্সট
import { CompareProvider } from '@/context/CompareContext'; // কম্পেয়ার কন্টেক্সট

export const metadata: Metadata = {
  title: 'IT Source BD | Best Computer & Mobile Accessories Shop in Bangladesh',
  description: 'Visit IT Source BD to get always 100% genuine computer, laptop & mobile accessories at the best price. Enjoy latest price, fast delivery & warranty support',
  icons: {
    icon: '/icon.png', 
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col justify-between pb-16 md:pb-0 text-gray-900 antialiased">
        {/* পুরো অ্যাপটিকে CartProvider ও CompareProvider দিয়ে র‍্যাপ করা হলো */}
        <CartProvider>
          <CompareProvider>
            
            <Header />
            
            {/* মূল মেইন কন্টেইনার যা জুম আউট বা ইন করলেও সেন্টারে থাকবে এবং ভাঙবে না */}
            <div className="w-full flex-1 flex flex-col items-center">
              <div className="w-full max-w-[1360px] mx-auto flex-1 flex flex-col">
                <main className="flex-grow">{children}</main>
              </div>
            </div>
            
            <Footer />
            <BottomNav />

          </CompareProvider>
        </CartProvider>
      </body>
    </html>
  );
}