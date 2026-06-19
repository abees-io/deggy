'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API contact form
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 4500);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/15">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Office Locations</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Connect With Our Practice
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Have questions or need assistance? Fill out our inquiry form or contact our front office desk directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Form and Details */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Info & Map Column */}
        <div className="flex flex-col gap-8 justify-between">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Contact Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="flex gap-3">
                <span className="p-3 bg-sky-50 text-primary rounded-2xl shrink-0 h-fit">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800">Phone Support</h4>
                  <p className="text-slate-500 mt-1">Direct: (555) 019-9000</p>
                  <p className="text-slate-500">Fax: (555) 019-9001</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="p-3 bg-teal-50 text-accent rounded-2xl shrink-0 h-fit">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800">Email Address</h4>
                  <p className="text-slate-500 mt-1">General: info@dentalcarepro.com</p>
                  <p className="text-slate-500">Billing: billing@dentalcarepro.com</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="p-3 bg-sky-50 text-primary rounded-2xl shrink-0 h-fit">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800">Clinic Address</h4>
                  <p className="text-slate-500 mt-1 leading-relaxed">
                    120 Medical Center Dr,<br />
                    Suite 400, Chicago, IL 60611
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="p-3 bg-teal-50 text-accent rounded-2xl shrink-0 h-fit">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-bold text-slate-800">Office Hours</h4>
                  <p className="text-slate-500 mt-1">Mon - Fri: 8 AM - 7 PM</p>
                  <p className="text-slate-500">Saturday: 9 AM - 3 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed Mockup */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-slate-100 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.12932338392!2d-87.62534572337651!3d41.89543596425946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cac648d7b3d%3A0x67ec05370d9a6ad6!2sNorthwestern%20Memorial%20Hospital!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-300"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location Chicago"
            />
          </div>
        </div>

        {/* Inquiry Form Column */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Submit Inquiry</h2>
              <p className="text-xs md:text-sm text-slate-500">Fill out this secure form. A clinical coordinator will respond to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="Full Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Sarah Connor"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="sarah@example.com"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <Textarea
                label="Your Inquiry *"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Enter details about your query or requested treatment plan..."
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="w-full py-3.5 rounded-xl shadow-none font-bold mt-2"
              >
                {success ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="h-4.5 w-4.5" />
                    Message Submitted Successfully!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <Send className="h-4.5 w-4.5" />
                    Send Inquiry
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
