'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase, isMockDatabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Smile, ShieldCheck, AlertCircle, Info } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, skip to dashboard
  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession') || localStorage.getItem('sb-admin-token');
    if (adminSession) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isMockDatabase) {
        // Mock authentication check
        if (email === 'admin@dentalcarepro.com' && password === 'admin') {
          sessionStorage.setItem('adminSession', 'mock-session-active');
          router.push('/admin/dashboard');
        } else {
          setErrorMsg('Invalid admin credentials. (Hint: Use admin@dentalcarepro.com / admin)');
        }
      } else {
        // Real Supabase Authentication
        const { data, error } = await supabase!.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw new Error(error.message);
        }

        if (data.session) {
          localStorage.setItem('sb-admin-token', data.session.access_token);
          router.push('/admin/dashboard');
        } else {
          setErrorMsg('No session active. Try registering your admin user in Supabase.');
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden -mt-16 md:-mt-20">
      {/* Glow overlays */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700/60 z-10 text-white"
      >
        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
            <Smile className="h-7 w-7" />
          </span>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">Admin Portal</h1>
          <p className="text-xs text-slate-400 font-medium">Log in to manage appointments, confirm bookings, and view analytics.</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl text-xs md:text-sm flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@dentalcarepro.com"
              className="w-full px-4 py-3 bg-slate-750 border border-slate-700 focus:border-primary focus:ring-4 focus:ring-sky-500/10 rounded-xl text-white outline-none transition-all placeholder-slate-500 text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-750 border border-slate-700 focus:border-primary focus:ring-4 focus:ring-sky-500/10 rounded-xl text-white outline-none transition-all placeholder-slate-500 text-sm"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full py-3.5 rounded-xl shadow-none font-bold mt-2"
          >
            Authenticate Portal
          </Button>
        </form>

        {isMockDatabase && (
          <div className="mt-6 p-4 bg-sky-500/5 border border-sky-500/20 text-sky-300 rounded-2xl text-xs flex items-start gap-2.5">
            <Info className="h-4.5 w-4.5 shrink-0 mt-0.5 text-primary" />
            <div>
              <p className="font-bold mb-0.5">Mock Database Active</p>
              <p className="leading-relaxed">No credentials set in `.env.local` yet. Use standard credentials: <span className="text-white underline">admin@dentalcarepro.com</span> with password <span className="text-white underline">admin</span> to explore.</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
