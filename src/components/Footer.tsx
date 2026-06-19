'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Smile, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Simulate subscribe API
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Showcase */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md">
              <Smile className="h-6 w-6" />
            </span>
            <span className="font-bold text-lg md:text-xl text-white tracking-tight">
              DentalCare<span className="text-primary">Pro</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Creating beautiful, confident smiles with state-of-the-art dental procedures and personalized care. Your oral health is our lifetime priority.
          </p>
          <div className="flex flex-col gap-2 mt-2 text-sm text-slate-300">
            <a href="tel:+15550199000" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              (555) 019-9000
            </a>
            <a href="mailto:info@dentalcarepro.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4 text-primary" />
              info@dentalcarepro.com
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-1" />
              <span>120 Medical Center Dr,<br />Suite 400, Chicago, IL 60611</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide">Quick Links</h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Clinic', path: '/about' },
              { name: 'Dental Services', path: '/services' },
              { name: 'Our Dentists', path: '/doctors' },
              { name: 'Smile gallery', path: '/gallery' },
              { name: 'Contact & Map', path: '/contact' }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="hover:text-white hover:translate-x-1 inline-block transition-all cursor-pointer">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide">Clinic Hours</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Monday - Friday</span>
              <span className="text-white font-medium">8:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Saturday</span>
              <span className="text-white font-medium">9:00 AM - 3:00 PM</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Sunday</span>
              <span className="text-rose-400 font-semibold uppercase tracking-wider text-xs bg-rose-500/10 px-2 py-0.5 rounded">Closed</span>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-slate-500">
              *Emergency services are active 24/7. Please dial our urgent support line for immediate assistance.
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-white font-bold text-base mb-6 tracking-wide">Newsletter</h4>
          <p className="text-sm leading-relaxed mb-4">
            Subscribe to receive oral health tips, clinic updates, and seasonal treatment offers.
          </p>
          <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-full py-3.5 pl-4 pr-12 text-sm outline-none focus:border-primary transition-all placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white rounded-full px-3 flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all cursor-pointer disabled:bg-emerald-600"
              >
                {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            {subscribed && (
              <span className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Thank you for subscribing!
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} DentalCare Pro. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/admin/login" className="hover:text-white transition-colors cursor-pointer font-semibold text-slate-500 hover:text-primary">
            Admin Portal
          </Link>
          <Link href="/faq" className="hover:text-white transition-colors cursor-pointer">
            Privacy Policy
          </Link>
          <Link href="/faq" className="hover:text-white transition-colors cursor-pointer">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};
