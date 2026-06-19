'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Smile, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Treatments', path: '/treatments' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-b border-slate-100/80 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md shadow-sky-100 group-hover:scale-105 transition-transform">
              <Smile className="h-6 w-6" />
            </span>
            <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight">
              DentalCare<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors cursor-pointer relative py-1.5 ${
                    isActive ? 'text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Book Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary-hover shadow-md shadow-sky-100 hover:shadow-lg hover:shadow-sky-200 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-30 bg-white border-b border-slate-100 shadow-xl max-h-[calc(100vh-65px)] overflow-y-auto lg:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-base font-bold py-2 border-b border-slate-50 transition-colors cursor-pointer ${
                      isActive ? 'text-primary' : 'text-slate-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/book"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-md transition-colors mt-2 cursor-pointer"
              >
                <Calendar className="h-5 w-5" />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
