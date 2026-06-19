'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Calendar, CreditCard, Heart, ShieldAlert, PhoneCall } from 'lucide-react';
import { FAQItem } from '@/types';

const FAQS: FAQItem[] = [
  {
    category: 'Appointments',
    question: 'How do I schedule an appointment online?',
    answer: 'Simply visit our "Book Appointment" page. Select your doctor, your desired treatment, and your preferred date and time slot. Fill out your contact details, and click "Submit." You will receive an instant digital booking confirmation ID.'
  },
  {
    category: 'Appointments',
    question: 'What is your rescheduling and cancellation policy?',
    answer: 'We request that you give us at least 24 hours notice for any cancellations or rescheduling. This allows us to offer the slot to patients needing same-day emergency treatments. You can call our reception desk at (555) 019-9000 to reschedule.'
  },
  {
    category: 'Treatments',
    question: 'Are your whitening procedures safe for sensitive teeth?',
    answer: 'Yes, absolutely. We use cold light LED activation alongside clinical-grade desensitizing gels. This protects your enamel and keeps tooth nerves comfortable throughout the whitening cycles.'
  },
  {
    category: 'Treatments',
    question: 'What should I do if my temporary veneer or crown comes off?',
    answer: 'Temporary crowns and veneers are secured with temporary cement so they can be easily replaced. If one comes loose, keep it clean and call our office. We will schedule a quick 10-minute slot to re-cement it before your permanent restoration is ready.'
  },
  {
    category: 'Pricing',
    question: 'Do you offer dental payment plans?',
    answer: 'Yes, we offer flexible, interest-free payment plans (through partners like CareCredit) for complex cosmetic makeovers and dental implant surgeries. This splits the fee into 6, 12, or 18 monthly installments.'
  },
  {
    category: 'Pricing',
    question: 'How much does a general consultation checkup cost?',
    answer: 'An initial consultation, digital checkup exam, and doctor review has a transparent flat cost of $50. If you require digital 3D scans or root x-rays, these are priced separately and are usually fully covered by insurance.'
  },
  {
    category: 'Insurance',
    question: 'Which dental insurance providers do you work with?',
    answer: 'We are in-network with major PPO insurance networks, including Delta Dental, Aetna, Cigna, Blue Cross Blue Shield, MetLife, and Guardian. Our front desk staff will handle all claims filing directly.'
  },
  {
    category: 'Emergency Care',
    question: 'What is considered a dental emergency?',
    answer: 'Dental emergencies include severe, persistent tooth pain preventing sleep, facial swelling, a knocked-out tooth, active mouth bleeding due to trauma, or a loose implant fixture. If you experience these, call our emergency line immediately.'
  },
  {
    category: 'Emergency Care',
    question: 'Can I get a same-day appointment for urgent tooth pain?',
    answer: 'Yes, we save special slots every day specifically for emergency walks-ins or calls. Call our office at (555) 019-9000 as early as possible in the morning to be seen on the same day.'
  }
];

const CATEGORIES: FAQItem['category'][] = ['Appointments', 'Treatments', 'Pricing', 'Insurance', 'Emergency Care'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQItem['category']>('Appointments');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getCategoryIcon = (cat: FAQItem['category']) => {
    switch (cat) {
      case 'Appointments': return Calendar;
      case 'Treatments': return Heart;
      case 'Pricing': return CreditCard;
      case 'Insurance': return CreditCard;
      case 'Emergency Care': return ShieldAlert;
      default: return HelpCircle;
    }
  };

  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/10">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">FAQ Hub</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Find instant answers regarding appointment bookings, dental procedures, billing rates, insurance networks, and urgent operations.
            </p>
          </div>
        </div>
      </section>

      {/* Accordions and Sidebar Grid */}
      <section className="max-w-5xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Category List */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 border-slate-100 shrink-0">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedIndex(null);
                }}
                className={`px-4.5 py-3.5 rounded-2xl text-xs md:text-sm font-bold tracking-wide transition-all text-left flex items-center gap-2.5 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-sky-100 lg:translate-x-1'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              {filteredFaqs.map((faq, idx) => {
                const isOpen = expandedIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow"
                  >
                    <button
                      onClick={() => handleToggle(idx)}
                      className="w-full px-6 py-4.5 flex items-center justify-between text-left font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-50/50"
                    >
                      <span className="pr-4 flex items-center gap-2">
                        <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Collapsible Panel */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-64 border-t border-slate-100/60' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 py-4.5 text-slate-500 text-xs md:text-sm leading-relaxed bg-slate-50/20">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Emergency Alert box inside FAQs */}
          {activeCategory === 'Emergency Care' && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 mt-4 flex flex-col sm:flex-row gap-4 items-start">
              <span className="p-3 bg-white text-rose-500 rounded-2xl shadow-sm shrink-0">
                <ShieldAlert className="h-6 w-6" />
              </span>
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-rose-900 text-sm md:text-base">Need Immediate Medical Assistance?</h4>
                <p className="text-xs md:text-sm text-rose-600 leading-relaxed">
                  Severe tooth trauma or persistent facial swelling requires emergency evaluation. Please call our direct helpline at (555) 019-9000 immediately. We keep specialists on-call 24 hours a day.
                </p>
                <a
                  href="tel:+15550199000"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl transition-all shadow-md w-fit cursor-pointer"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Call Direct Line
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
