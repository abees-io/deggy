'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@/components/ui/dialog';
import { Eye, Image as ImageIcon, MapPin, Grid } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'Clinic Interior' | 'Equipment' | 'Treatment Rooms' | 'Smile Transformations';
  title: string;
  url: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'Clinic Interior',
    title: 'Main Lobby & Reception',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    description: 'A serene reception foyer designed with wooden fixtures and custom warm lightning to reduce dental anxiety.'
  },
  {
    id: 'gal-2',
    category: 'Treatment Rooms',
    title: 'Executive Operatory Room',
    url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    description: 'Equipped with orthopedic dentist chairs, flat-screen entertainment systems, and sterile airflow vents.'
  },
  {
    id: 'gal-3',
    category: 'Equipment',
    title: 'Low-Radiation CBCT Scanner',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    description: 'Provides high-definition 3D jaw layouts, vital for dental implants and bite diagnostics.'
  },
  {
    id: 'gal-4',
    category: 'Smile Transformations',
    title: 'Full Porcelain Makeover',
    url: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'Completed zirconia crowns and custom veneers, matching the patient\'s specific facial alignment.'
  },
  {
    id: 'gal-5',
    category: 'Treatment Rooms',
    title: 'Microscopic Treatment Operatory',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    description: 'Includes active high-magnification microscope cameras for precise root channel cavity sealings.'
  },
  {
    id: 'gal-6',
    category: 'Clinic Interior',
    title: 'Pediatric Dental Playroom',
    url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800',
    description: 'A fun space filled with toys and interactive video games where children can relax prior to checkups.'
  }
];

const CATEGORIES = ['All', 'Clinic Interior', 'Equipment', 'Treatment Rooms', 'Smile Transformations'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => activeCategory === 'All' || item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full flex flex-col pb-24">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 max-w-2xl mx-auto"
          >
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Office Visuals</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Tour Our State-of-the-Art Office
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Browse through photos of our premium clinic lobbies, micro-surgery operatory suites, and smile transformations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-wrap gap-2.5 items-center justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4.5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide border transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary text-white border-primary shadow-lg shadow-sky-100'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-md group border border-slate-100 cursor-pointer bg-slate-50 flex"
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full object-cover rounded-3xl group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white rounded-3xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-200">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-base mt-1.5 flex items-center gap-1.5">
                    {item.title}
                    <Eye className="h-4 w-4 text-white/80 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox Dialog Modal */}
      <Dialog
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        title={lightboxImage?.title}
        description={lightboxImage?.category}
        className="max-w-2xl bg-white p-4"
      >
        {lightboxImage && (
          <div className="flex flex-col gap-4 mt-2 select-none">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 bg-slate-100 relative">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed pl-1">
              {lightboxImage.description}
            </p>
            <div className="flex items-center gap-2 mt-2 pt-4 border-t border-slate-100 text-xs text-slate-400 font-semibold pl-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span>DentalCare Pro Chicago Clinic Location</span>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
