'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Award, CheckCircle2, ChevronRight, Stethoscope, Sparkles, Smile, Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Stats data
const STATS = [
  { value: '10,000+', label: 'Happy Patients', icon: Smile, color: 'text-sky-500 bg-sky-50' },
  { value: '25+', label: 'Years Experience', icon: Award, color: 'text-teal-500 bg-teal-50' },
  { value: '15+', label: 'Dental Specialists', icon: Stethoscope, color: 'text-indigo-500 bg-indigo-50' },
  { value: '98%', label: 'Satisfaction Rate', icon: Heart, color: 'text-rose-500 bg-rose-50' }
];

// Services Preview data
const SERVICES_PREVIEW = [
  {
    title: 'Teeth Whitening',
    description: 'Brighten your smile up to 8 shades with our advanced, enamel-safe cold light technology.',
    link: '/services'
  },
  {
    title: 'Dental Implants',
    description: 'Permanent, natural-looking tooth replacements crafted from surgical-grade titanium.',
    link: '/services'
  },
  {
    title: 'Root Canal Treatment',
    description: 'Pain-free root therapy to save damaged teeth using microscopic surgical systems.',
    link: '/services'
  },
  {
    title: 'Orthodontics & Aligners',
    description: 'Straighten your teeth invisibly with custom clear aligners or premium Damon braces.',
    link: '/services'
  },
  {
    title: 'Cosmetic Dentistry',
    description: 'Transform your aesthetics with custom porcelain veneers, bonding, and gum contouring.',
    link: '/services'
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Gentle, friendly, and preventative dental care customized specifically for kids.',
    link: '/services'
  }
];

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-tr from-sky-50/50 via-white to-teal-50/30 overflow-hidden pt-12 md:pt-0">
        {/* Background decorative blobs */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          {/* Left Column: Heading and copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-sky-100/60 border border-sky-200/50 backdrop-blur-md px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-primary tracking-wide uppercase">
                Next-Gen Healthcare Luxury
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 leading-tight tracking-tight">
              Creating <span className="text-gradient">Beautiful Smiles</span> for a Lifetime
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Welcome to DentalCare Pro. We combine world-class dental specialists, microscopic technologies, and a calm, spa-like environment to deliver a premium dental experience.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/book">
                <Button variant="primary" className="shadow-lg">
                  Book Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="group">
                  Explore Services
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span className="text-xs md:text-sm text-slate-600 font-semibold">ADA Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="text-xs md:text-sm text-slate-600 font-semibold">4.9/5 Google Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[4/3] max-w-xl mx-auto"
          >
            {/* Main Image */}
            <div className="w-full h-full rounded-[40px] overflow-hidden border-8 border-white shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                alt="Modern Premium Dental Clinic Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Card 1: Happy Patients */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -left-6 bottom-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100/50 flex items-center gap-3 z-20"
            >
              <span className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Painless Care</p>
                <p className="text-sm font-bold text-slate-800">100% Painless Procedures</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Interactive Counter */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -right-6 top-16 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100/50 flex items-center gap-3 z-20 animate-float"
            >
              <span className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Emergency Slots</p>
                <p className="text-sm font-bold text-slate-800">Same-Day Availability</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left px-4"
                >
                  <div className={`p-4 rounded-2xl shrink-0 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">
              Comprehensive Treatments
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
              Elite General & Cosmetic Services
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              From routine cleaning and whitening to advanced microscopic root canal therapy and full mouth implants.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_PREVIEW.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-sky-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6 shadow-inner">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover transition-colors mt-auto cursor-pointer"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Interactive points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <span className="text-xs md:text-sm font-bold text-accent uppercase tracking-wider">
              The DentalCare Pro Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              A Higher Standard of Professional Dental Care
            </h2>
            <p className="text-sm md:text-base text-slate-500 mb-4">
              We leverage microscopic systems, digital scanners, and a highly certified clinical staff to deliver beautiful smiles without the dental anxiety.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Advanced Technology', desc: 'Digital dental scanners, 3D imaging, and laser surgery systems.' },
                { title: 'Expert Doctors', desc: 'Board-certified dental specialists with 15+ years of surgery experience.' },
                { title: 'Affordable Pricing', desc: 'Interest-free payment plan choices and major insurance coverages.' },
                { title: 'Personalized Care', desc: 'Custom treatments designed for your specific structural blueprint.' }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm md:text-base">{point.title}</h4>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Premium treatment room image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full aspect-[4/3] rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl relative"
          >
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
              alt="Dentists treating patients using modern machinery"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 5. DYNAMIC CALL TO ACTION BANNER */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-sky-950 text-white relative overflow-hidden">
        {/* Background glow overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight max-w-xl">
            Ready to Experience World-Class Dentistry?
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-lg leading-relaxed">
            Schedule your comprehensive digital exam and consultation online in under 2 minutes. Receive same-day scheduling and transparent pricing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link href="/book">
              <Button variant="primary" className="bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900">
                Book Appointment Online
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Contact Office
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
