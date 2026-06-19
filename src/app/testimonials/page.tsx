'use client';

import React from 'react';
import { Star, Quote, CheckCircle, ThumbsUp, ShieldCheck, Heart } from 'lucide-react';
import { Review } from '@/types';

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sarah Connor',
    rating: 5,
    date: 'June 18, 2026',
    comment: 'The computer-guided dental implants changed my life. Dr. Emily Vance explained the procedures step-by-step. I experienced zero pain during the titanium installation!',
    treatment: 'Dental Implants',
    isVerified: true
  },
  {
    id: 'rev-2',
    author: 'John Connor',
    rating: 5,
    date: 'May 24, 2026',
    comment: 'I completed my Invisalign clear braces treatment in just 9 months here. The iTero 3D camera scan is super fast and clean. My bite alignment is finally perfect.',
    treatment: 'Braces & Aligners',
    isVerified: true
  },
  {
    id: 'rev-3',
    author: 'Marcus Wright',
    rating: 5,
    date: 'April 12, 2026',
    comment: 'I was always terrified of root canal needles. Dr. Patel and the team used laser therapy. I was completely relaxed in the chair, and the pain is entirely gone.',
    treatment: 'Root Canal Treatment',
    isVerified: true
  },
  {
    id: 'rev-4',
    author: 'Kate Brewster',
    rating: 5,
    date: 'March 30, 2026',
    comment: 'Amazing pediatric dentistry team! My 6-year-old was laughing during her checkup scaling because of the friendly playrooms and gentle soft-touch tools.',
    treatment: 'Pediatric Dentistry',
    isVerified: true
  },
  {
    id: 'rev-5',
    author: 'Kyle Reese',
    rating: 5,
    date: 'February 15, 2026',
    comment: 'Had my teeth polished and bleached using cold light whitening. The result is immediate (8 shades lighter!). Highly recommend the DentalCare Pro packages.',
    treatment: 'Teeth Whitening',
    isVerified: true
  },
  {
    id: 'rev-6',
    author: 'Grace Jones',
    rating: 5,
    date: 'January 20, 2026',
    comment: 'Had full porcelain dental crown caps fitted on my fractured front teeth. The translucent shading matches my adjacent teeth enamel perfectly. Exceptional service.',
    treatment: 'Crowns & Bridges',
    isVerified: true
  }
];

export default function TestimonialsPage() {
  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/20">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Patient Feedback</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Verified Patient Success Stories
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Read real clinic reviews and success stories from patients who transformed their dental aesthetics and hygiene here.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Summary Bar */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm text-center">
          <div className="flex flex-col items-center gap-1.5 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0">
            <span className="text-4xl font-black text-slate-800">4.9 / 5</span>
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Over 1,200 Google Reviews</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 border-b md:border-b-0 md:border-r border-slate-100 py-6 md:py-0">
            <span className="text-4xl font-black text-slate-800">98%</span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Satisfaction
            </span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Patient Survey Benchmark</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 pt-6 md:pt-0">
            <span className="text-4xl font-black text-slate-800">10,000+</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Happy Completed Smiles</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Since Clinic Inception</span>
          </div>
        </div>
      </section>

      {/* Grid Reviews */}
      <section className="max-w-7xl mx-auto px-4 w-full py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-sky-50/80 absolute -left-3 -top-4 -z-10" />
                  <p className="text-sm text-slate-600 leading-relaxed italic relative z-10">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              {/* Bottom user card */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800">{rev.author}</h4>
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider">{rev.treatment}</span>
                </div>
                {rev.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <CheckCircle className="h-3 w-3 shrink-0" />
                    Verified Patient
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
