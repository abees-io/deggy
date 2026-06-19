'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Award, Star, ArrowRight, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Doctor } from '@/types';

const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Emily Vance',
    qualification: 'DDS, Harvard School of Dental Medicine',
    experience: '18 Years',
    specialization: 'Cosmetic Dentistry & Implants',
    about: 'Dr. Vance is a board-certified specialist in computer-guided dental implants and digital smile designs. She is a member of the American Academy of Cosmetic Dentistry.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chen',
    qualification: 'DDS, MS, Columbia University',
    experience: '12 Years',
    specialization: 'Orthodontics & Braces',
    about: 'Dr. Chen specializes in clear aligner therapy (Invisalign) and self-ligating Damon brackets. He has successfully completed over 1,500 orthodontic cases.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'doc-3',
    name: 'Dr. Sarah Patel',
    qualification: 'DDS, Residency at Northwestern University',
    experience: '9 Years',
    specialization: 'Pediatric Dentistry',
    about: 'Dr. Patel loves working with young patients, focusing on preventative hygiene, sealants, and positive reinforcement to eliminate childhood dental anxieties.',
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    photoUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=800'
  }
];

const SPECIALIZATIONS = ['All', 'Cosmetic Dentistry & Implants', 'Orthodontics & Braces', 'Pediatric Dentistry'];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

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
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Clinical Experts</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Meet Our Board-Certified Specialists
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Our clinicians combine advanced research credentials with gentle treatment techniques to provide a premium dental standard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search Control */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search doctors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="h-4.5 w-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Specialization Chips */}
        <div className="flex flex-wrap gap-2.5 items-center justify-center">
          {SPECIALIZATIONS.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide border transition-all cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-primary text-white border-primary shadow-md shadow-sky-100'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {spec === 'All' ? 'All Specialties' : spec.split(' & ')[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 max-w-md mx-auto">
            <UserCheck className="h-10 w-10 text-slate-400 mx-auto mb-4" />
            <h4 className="font-bold text-slate-700">No Specialists Found</h4>
            <p className="text-sm text-slate-400 mt-1">Try resetting your search query or specialty filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={doc.photoUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute right-4 top-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 tracking-wider shadow border border-slate-100 uppercase">
                      {doc.experience} Experience
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-black text-primary tracking-widest">
                        {doc.specialization}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight mt-1.5 mb-3">
                        {doc.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl w-fit mb-4">
                        <Award className="h-4 w-4 text-primary shrink-0" />
                        <span>{doc.qualification}</span>
                      </div>

                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        {doc.about}
                      </p>

                      {/* Available Days */}
                      <div className="flex flex-col gap-2 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Days:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {doc.availableDays.map((d) => (
                            <span key={d} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-sky-50 text-primary px-2.5 py-1 rounded-full border border-sky-100">
                              <Calendar className="h-3 w-3 shrink-0" />
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Book CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-700">5.0 Rating</span>
                      </div>
                      <Link href={`/book?doctor=${encodeURIComponent(doc.name)}`}>
                        <Button variant="primary" className="px-5 py-2.5 text-xs font-bold flex items-center gap-1 rounded-xl shadow-none">
                          Book Appointment
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
