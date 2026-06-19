'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Eye, ShieldCheck, Heart, Award, Trophy, Smile } from 'lucide-react';

const TIMELINE = [
  { year: '2001', title: 'Clinic Founded', desc: 'Dr. Emily Vance established DentalCare Pro with a single operatory chair in Chicago.' },
  { year: '2007', title: 'Specialist Addition', desc: 'Expanded into orthodontic and pediatric specialties, hiring Dr. Michael Chen.' },
  { year: '2015', title: 'Tech Modernization', desc: 'Replaced traditional film X-rays with low-radiation 3D cone beam CT scanning systems.' },
  { year: '2022', title: 'Vercel Award Winner', desc: 'Recognized as Chicago\'s top customer-centric digital booking medical clinic.' }
];

const MACHINERY = [
  { name: '3D CBCT Scanner', desc: 'High-definition 3D jaw scans using 90% less radiation than legacy systems.' },
  { name: 'Surgical Microscope', desc: 'Enables high-precision root canal fillings, preserving more natural enamel structure.' },
  { name: 'WaterLase iPlus Laser', desc: 'Cuts and sculpts hard or soft tissue painlessly without drills or anesthesia shots.' },
  { name: 'iTero Intraoral Scanner', desc: 'Captures a complete digital map of teeth in seconds, replacing messy impression trays.' }
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col pb-24">
      {/* Page Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 max-w-2xl mx-auto"
          >
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">
              About Our Clinic
            </span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Creating Confident Smiles Since 2001
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Discover the clinical standards, microscopic equipment, and historical benchmarks that define DentalCare Pro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
            alt="Dental surgery chair and medical setup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Our Care Philosophy
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            At DentalCare Pro, we believe that dental visits should be relaxing rather than stressful. We have designed our clinical spaces to evoke a serene, spa-like experience. Our doctors spend time explaining procedures beforehand, helping eliminate common dental anxieties.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex gap-3">
              <Compass className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Mission Oriented</h4>
                <p className="text-xs text-slate-500 mt-1">To deliver state-of-the-art general and cosmetic dental procedures with microscopic accuracy.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Eye className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Patient Vision</h4>
                <p className="text-xs text-slate-500 mt-1">Creating beautiful, fully functional smiles that enhance life-long self-esteem and health.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-slate-50/50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Historical Benchmarks</span>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Our Timeline</h2>
            <p className="text-sm text-slate-500">From a single operatory clinic to Chicago\'s most requested multi-specialty dental hub.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto pl-8 space-y-12">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline node */}
                <span className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-white bg-primary shadow flex items-center justify-center text-[10px] text-white font-bold" />
                <span className="text-xs font-bold bg-sky-100 text-primary px-3 py-1 rounded-full">{item.year}</span>
                <h3 className="font-bold text-slate-800 text-lg mt-2.5">{item.title}</h3>
                <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery Showcase */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider">Clinical Standards</span>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Advanced Equipment Showcase</h2>
          <p className="text-sm text-slate-500">We invest in state-of-the-art dental equipment to assure microscopic diagnostic accuracy and maximum comfort.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MACHINERY.map((mach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">{mach.name}</h4>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{mach.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications and Awards */}
      <section className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center flex flex-col gap-8">
          <h2 className="text-white text-2xl font-bold">Certifications & Awards</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 mt-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">ADA Member</h4>
                <p className="text-xs text-slate-500">American Dental Association</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-400" />
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">Top Cosmetic Clinic 2024</h4>
                <p className="text-xs text-slate-500">Chicago Dental Awards</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Smile className="h-8 w-8 text-teal-400" />
              <div className="text-left">
                <h4 className="text-white font-semibold text-sm">Comfort Excellence</h4>
                <p className="text-xs text-slate-500">Patient-First Care Association</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
