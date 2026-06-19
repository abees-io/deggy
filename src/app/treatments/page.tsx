'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeforeAfterSlider } from '@/components/BeforeAfterSlider';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, HelpCircle, Activity, Heart, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TreatmentDetail {
  slug: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  process: string[];
  recovery: {
    duration: string;
    details: string;
  };
  faqs: { q: string; a: string }[];
}

const TREATMENTS: TreatmentDetail[] = [
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    beforeImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'A permanent solution for missing teeth. We insert surgical titanium screw posts into the jawbone, which fuse naturally over time to secure custom porcelain crowns.',
    process: [
      'Digital 3D jaw bone density scans & guide layout design',
      'Minimally invasive surgical insertion of the titanium implant post',
      'Osseointegration healing period (usually 3 to 6 months)',
      'Digital scanning & attachment of custom translucent zirconia crown'
    ],
    recovery: {
      duration: '3 - 6 Months Fusing / 1-2 Weeks Gum Healing',
      details: 'Slight swelling is normal for 48 hours post-op. Soft foods are recommended for the first 10 days. The titanium post fuses with the bone gradually over a few months.'
    },
    faqs: [
      { q: 'Is the implant procedure painful?', a: 'No, local anesthesia is administered, and sedation options are available. Post-procedure discomfort is easily managed with mild pain relievers.' },
      { q: 'How long do dental implants last?', a: 'The titanium implant post fuses with your jawbone and can last a lifetime with proper hygiene. The outer porcelain crown typically lasts 15-20 years before minor wear replacement.' }
    ]
  },
  {
    slug: 'smile-makeover',
    name: 'Smile Makeover',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'A customized blend of aesthetic dental services designed to transform your overall smile dynamics, incorporating veneers, crowns, gum lifts, and bleaching.',
    process: [
      'Digital smile mapping and diagnostic mockups of your face structure',
      'Teeth surface scaling and micro-prep shaping (for veneers/crowns)',
      'Acrylic mockups placed temporarily so you can test drive your smile',
      'Cementation of custom hand-layered porcelain veneers and cosmetic crowns'
    ],
    recovery: {
      duration: '3 - 5 Days Adaptation',
      details: 'You may experience minor sensitivity to hot or cold drinks for a few days. The tongue and lips adapt to the new teeth alignment within a week.'
    },
    faqs: [
      { q: 'What can a smile makeover correct?', a: 'It corrects teeth discoloration, spaces, chips, worn enamel, and minor alignment issues. Each makeover is tailored to your skin tone and lip lines.' },
      { q: 'Are porcelain veneers stain-resistant?', a: 'Yes! High-grade dental porcelain is highly glass-glazed and resists staining from coffee, tea, and red wine far better than natural teeth enamel.' }
    ]
  },
  {
    slug: 'invisalign',
    name: 'Invisalign & Aligners',
    beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'Straighten your teeth comfortably and invisibly. Custom thermoplastic clear aligners shift your teeth into proper placement in sequence without metal brackets or wires.',
    process: [
      '3D intraoral dental scans to construct a digital orthodontic map',
      'Virtual simulation of your teeth shifting sequence (ClinCheck)',
      'Wearing custom transparent aligner trays (22 hours/day)',
      'Changing to new aligner trays every 1-2 weeks as teeth shift'
    ],
    recovery: {
      duration: 'Ongoing throughout treatment / 22 hours daily wear',
      details: 'There is a mild pressure feeling during the first 24-48 hours after moving to a new aligner tray set. This indicates healthy orthodontic shifting.'
    },
    faqs: [
      { q: 'Can I take the clear aligners out to eat?', a: 'Yes! You must remove your aligners when eating, drinking anything other than cold water, and during brushing or flossing.' },
      { q: 'How often do I need in-office checkups?', a: 'Checkups are usually scheduled every 6 to 8 weeks to monitor progress and provide you with your next aligner tray sets.' }
    ]
  },
  {
    slug: 'full-mouth-rehab',
    name: 'Full Mouth Rehabilitation',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'A comprehensive, multi-disciplinary dental plan restoring the structure, bite mechanics, and visual cosmetics of all teeth in both the upper and lower jaws.',
    process: [
      'Neuromuscular bite alignment testing and joint function scan',
      'Extraction of failing teeth and treatment of underlying gum inflammation',
      'Implant fixtures, hybrid bridges, and diagnostic crowns placed',
      'Final permanent zirconia restorative structures cemented in place'
    ],
    recovery: {
      duration: '4 - 12 Months (Phased Treatment)',
      details: 'Since full-mouth rehabilitation involves multiple stages (implants, crowns, bite adjustments), healing is spread out over phases. Complete functional recovery is achieved.'
    },
    faqs: [
      { q: 'Who is a candidate for full mouth rehabilitation?', a: 'Patients with multiple missing teeth, severe structural wear due to grinding, TMJ jaw issues, or advanced untreated tooth decay.' },
      { q: 'How is the treatment plan structured?', a: 'It is divided into phases starting with pain relief and gum healing, followed by implant placement, and finishing with aesthetic zirconia crowns.' }
    ]
  },
  {
    slug: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    beforeImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&q=80&w=800',
    description: 'General aesthetic procedures including bonding, composite fillings, and laser gum contouring to reshape uneven gumlines and correct minor tooth chips.',
    process: [
      'Clinical examination and visual mapping of gum and tooth margins',
      'Laser contouring of excess gum tissue or teeth shaping prep',
      'Shade-matching composite resin material applied directly',
      'Curing with UV light and detailed polishing to match enamel translucency'
    ],
    recovery: {
      duration: '1 - 2 Days Gum Healing / Immediate for Bonding',
      details: 'Laser gum contouring heals quickly with minimal soreness for 24-48 hours. Composite bonding allows normal eating immediately after the appointment.'
    },
    faqs: [
      { q: 'What is laser gum contouring?', a: 'A gentle procedure using diode lasers to remove excess gum tissue, correcting a "gummy" smile and creating an even dental arch line.' },
      { q: 'How long does cosmetic bonding take?', a: 'Cosmetic bonding for small chips or gaps is performed in a single visit, taking only 30-60 minutes per tooth.' }
    ]
  }
];

export default function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState<string>('dental-implants');

  const currentTreatment = TREATMENTS.find((t) => t.slug === activeTab) || TREATMENTS[0];

  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/20">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3 max-w-2xl mx-auto"
          >
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Aesthetic Portfolios</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Premium Dental Treatments
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Select a treatment below to view live Before/After smile comparisons, step-by-step processes, and recovery details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs & Content */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Tabs */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 border-slate-100 shrink-0">
            {TREATMENTS.map((t) => (
              <button
                key={t.slug}
                onClick={() => setActiveTab(t.slug)}
                className={`px-5 py-3.5 rounded-2xl text-xs md:text-sm font-bold tracking-wide transition-all text-left whitespace-nowrap cursor-pointer ${
                  activeTab === t.slug
                    ? 'bg-primary text-white shadow-lg shadow-sky-100 lg:translate-x-1'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Treatment Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTreatment.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
              >
                {/* Left Column: Interactive Before/After slider & Description */}
                <div className="flex flex-col gap-6">
                  <BeforeAfterSlider
                    beforeImage={currentTreatment.beforeImage}
                    afterImage={currentTreatment.afterImage}
                    beforeLabel="Before Treatment"
                    afterLabel={`${currentTreatment.name} Smile`}
                  />

                  <div className="flex flex-col gap-3 mt-2">
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                      About {currentTreatment.name}
                    </h2>
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                      {currentTreatment.description}
                    </p>
                    <Link href={`/book?treatment=${encodeURIComponent(currentTreatment.name)}`} className="mt-2">
                      <Button variant="primary" className="w-full sm:w-fit py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-none">
                        Book Appointment
                        <ArrowRight className="h-4.5 w-4.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Process & Recovery & FAQs */}
                <div className="flex flex-col gap-8">
                  {/* Process Timeline */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-primary" />
                      Treatment Steps
                    </h3>
                    <div className="relative border-l border-slate-200 pl-5 space-y-5 ml-2.5">
                      {currentTreatment.process.map((step, idx) => (
                        <div key={idx} className="relative">
                          <span className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white shadow" />
                          <h4 className="text-xs font-bold text-slate-400">Step {idx + 1}</h4>
                          <p className="text-xs md:text-sm font-medium text-slate-700 mt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recovery Info */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-accent" />
                      Recovery & Aftercare
                    </h3>
                    <div>
                      <span className="text-[11px] font-bold bg-teal-50 text-accent px-2.5 py-0.5 rounded border border-teal-100 inline-block mb-2">
                        {currentTreatment.recovery.duration}
                      </span>
                      <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                        {currentTreatment.recovery.details}
                      </p>
                    </div>
                  </div>

                  {/* Treatment FAQs */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Common Inquiries
                    </h3>
                    <div className="space-y-4">
                      {currentTreatment.faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex flex-col gap-1.5">
                          <h4 className="font-bold text-slate-800 text-xs md:text-sm flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {faq.q}
                          </h4>
                          <p className="text-xs md:text-sm text-slate-500 pl-3 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
