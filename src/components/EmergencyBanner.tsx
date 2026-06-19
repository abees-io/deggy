'use client';

import React, { useState } from 'react';
import { ShieldAlert, X, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EmergencyBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 text-white relative z-50 flex items-center shadow-md overflow-hidden"
        >
          <div className="max-w-7xl mx-auto w-full px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-center md:text-left pr-10">
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
              <span className="bg-white/20 p-1 rounded-full animate-pulse-slow">
                <ShieldAlert className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="text-xs md:text-sm font-semibold tracking-wide uppercase bg-red-500/90 text-white px-2 py-0.5 rounded-md shadow-sm">
                24/7 Dental Emergency
              </span>
              <p className="text-xs md:text-sm font-medium text-sky-50">
                Experiencing tooth pain or a broken crown? Same-day urgent appointments are open.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href="tel:+15550199000"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold bg-white text-teal-600 px-4 py-1.5 rounded-full hover:bg-sky-50 hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call Now: (555) 019-9000
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-sky-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
