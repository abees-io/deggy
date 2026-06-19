'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, ArrowRight, Activity, Smile, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceDetail {
  title: string;
  description: string;
  benefits: string[];
  procedureSteps: string[];
  duration: string;
  price: string;
}

const SERVICES: ServiceDetail[] = [
  {
    title: 'Dental Cleaning',
    description: 'Routine scaling and polishing using state-of-the-art ultrasound tooth plaque removers and air-flow polishing systems.',
    benefits: ['Prevents gum disease', 'Removes coffee/tobacco stains', 'Fresh breath assurance'],
    procedureSteps: ['Ultrasound Scaling', 'Air-flow Micro-Polishing', 'Flossing & Fluoride protection'],
    duration: '45 - 60 Minutes',
    price: '$79'
  },
  {
    title: 'Teeth Whitening',
    description: 'Enamel-safe, clinical cold light teeth whitening system that delivers up to 8 shades lighter teeth in a single hour.',
    benefits: ['Instant visual results', 'Removes deep dentin stains', 'Enamel-safe ingredients'],
    procedureSteps: ['Gum Barrier Protection', 'Whitening Gel Coating', 'Laser Light Activation (3 Cycles)'],
    duration: '60 Minutes',
    price: '$299'
  },
  {
    title: 'Root Canal Treatment',
    description: 'Microscopic root channel pulp therapy to relieve severe tooth pain and preserve natural dental structures.',
    benefits: ['Eliminates severe toothaches', 'Saves natural tooth structure', 'Painless local anesthesia'],
    procedureSteps: ['Digital CT mapping', 'Infected pulp extraction', 'Thermafil gutta-percha sealing'],
    duration: '1 - 2 Hours',
    price: '$650'
  },
  {
    title: 'Dental Implants',
    description: 'Permanent titanium fixture replacement that acts as a natural root anchor for crowns and full-arch dental bridges.',
    benefits: ['Prevents jawbone erosion', 'Restores full bite strength', 'Lasts a lifetime with proper care'],
    procedureSteps: ['3D Implant placement guide', 'Titanium post insertion', 'Custom zirconia crown fitting'],
    duration: '3 - 6 Months (Multi-stage)',
    price: '$1,800'
  },
  {
    title: 'Braces & Aligners',
    description: 'Custom clear aligners (Invisalign) and Damon braces designed to straighten crowded teeth discretely.',
    benefits: ['Near-invisible alignment', 'Improves bite alignment', 'Fewer dental visits needed'],
    procedureSteps: ['iTero 3D structural scan', 'Custom clear aligner manufacturing', 'Progressive tray adjustments'],
    duration: '6 - 18 Months',
    price: '$2,999'
  },
  {
    title: 'Veneers',
    description: 'Ultra-thin custom porcelain laminate shells bonded directly to the front teeth for an immediate smile upgrade.',
    benefits: ['Corrects chips and cracks', 'Custom color and shape matching', 'Resistant to coffee stains'],
    procedureSteps: ['Enamel prep (Minimal shave)', 'Digital impression', 'Porcelain cement bonding'],
    duration: '2 Dental Visits',
    price: '$899 / tooth'
  },
  {
    title: 'Crowns & Bridges',
    description: 'Bespoke zirconia and porcelain crowns to restore heavily damaged or missing teeth with high structural support.',
    benefits: ['Fortifies weak teeth', 'Restores visual alignment', 'Natural translucent tooth finish'],
    procedureSteps: ['Damaged structure preparation', 'Digital scanning', 'Permanent adhesive cementing'],
    duration: '2 Dental Visits',
    price: '$799'
  },
  {
    title: 'Tooth Extraction',
    description: 'Atraumatic removal of heavily decayed, fractured, or impacted wisdom teeth under gentle local anesthetic.',
    benefits: ['Stops spread of tooth decay', 'Relieves wisdom tooth crowding', 'Prevents sinus pressure issues'],
    procedureSteps: ['Pre-operative digital X-ray', 'Atraumatic luxation', 'Suture dressing & clotting care'],
    duration: '30 - 60 Minutes',
    price: '$150'
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Specialized preventative care, cavity sealants, and child-friendly consultations to build healthy dental habits.',
    benefits: ['Prevents childhood cavities', 'Friendly, anxiety-free approach', 'Early bite tracking reviews'],
    procedureSteps: ['Gentle soft-touch cleaning', 'Fluoride varnish coating', 'Oral hygiene habit education'],
    duration: '30 - 45 Minutes',
    price: '$99'
  },
  {
    title: 'Gum Treatment',
    description: 'Non-surgical scaling, root planing, and laser therapy to treat gingivitis and stabilize bleeding gums.',
    benefits: ['Prevents tooth loss', 'Halts gum recession', 'Stops persistent gum bleeding'],
    procedureSteps: ['Subgingival plaque scaling', 'Root planing polishing', 'Soft-tissue diode laser cleaning'],
    duration: '45 - 75 Minutes',
    price: '$199'
  }
];

export default function ServicesPage() {
  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/30">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 max-w-2xl mx-auto"
          >
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              State-of-the-Art Dental Care
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Explore our range of premium procedures, featuring transparent pricing, detailed process breakdowns, and expert execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 2) * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-6 border-b border-slate-100">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      {service.duration}
                    </span>
                    <span className="flex items-center gap-0.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      <DollarSign className="h-3.5 w-3.5 shrink-0" />
                      From {service.price}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed my-6">
                  {service.description}
                </p>

                {/* Benefits / Steps Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-slate-50/50 p-4 rounded-2xl">
                  {/* Benefits */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Smile className="h-3.5 w-3.5 text-primary" />
                      Benefits
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
                      {service.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-accent" />
                      Procedure Steps
                    </h4>
                    <ol className="space-y-1.5 text-xs text-slate-500 font-medium list-decimal list-inside">
                      {service.procedureSteps.map((s, idx) => (
                        <li key={idx}>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Book button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Fully Insurance Covered
                </span>
                <Link href={`/book?treatment=${encodeURIComponent(service.title)}`}>
                  <Button variant="primary" className="px-5 py-2.5 text-xs font-bold flex items-center gap-1 rounded-xl shadow-none">
                    Book Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
