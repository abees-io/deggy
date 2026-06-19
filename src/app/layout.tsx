import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { EmergencyBanner } from '@/components/EmergencyBanner';

export const metadata: Metadata = {
  title: 'DentalCare Pro | Premium Dental Clinic & Appointment Booking',
  description: 'Experience premium dental care and orthodontic excellence. Book teeth whitening, implants, root canal treatments, Invisalign, and cosmetic smiles online with our expert specialists.',
  keywords: ['dental clinic', 'dentist appointment', 'teeth whitening', 'dental implants', 'root canal', 'Invisalign', 'cosmetic dentistry', 'orthodontics'],
  authors: [{ name: 'DentalCare Pro Team' }],
  metadataBase: new URL('https://dentalcarepro-deggy.vercel.app'),
  openGraph: {
    title: 'DentalCare Pro | Premium Dental Clinic & Appointment Booking',
    description: 'Experience dental care excellence. Book teeth whitening, implants, root canal treatments, and cosmetic dentistry online with our specialists.',
    url: 'https://dentalcarepro-deggy.vercel.app',
    siteName: 'DentalCare Pro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DentalCare Pro Clinic'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DentalCare Pro | Premium Dental Clinic',
    description: 'Book dental crowns, whitening, implants, root canals, and braces with top dental specialists online.',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {/* Urgent Emergency Alert Banner */}
        <EmergencyBanner />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic page content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Footer info & links */}
        <Footer />

        {/* Online support floating bubble */}
        <ChatWidget />
      </body>
    </html>
  );
}
