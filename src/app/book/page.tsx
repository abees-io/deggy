'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCircle, CalendarDays, Clock, UserCheck, Stethoscope, ClipboardList, Printer, Phone } from 'lucide-react';

const DOCTORS = ['Dr. Emily Vance', 'Dr. Michael Chen', 'Dr. Sarah Patel'];
const TREATMENTS = [
  'Dental Cleaning',
  'Teeth Whitening',
  'Root Canal Treatment',
  'Dental Implants',
  'Braces & Aligners',
  'Veneers',
  'Crowns & Bridges',
  'Tooth Extraction',
  'Pediatric Dentistry',
  'Gum Treatment'
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM'
];

// Inner component that reads searchParams. Must be wrapped in Suspense.
function BookingFormInner() {
  const searchParams = useSearchParams();
  
  // State variables for form inputs
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [treatmentName, setTreatmentName] = useState('');
  const [symptoms, setSymptoms] = useState('');

  // Scheduling states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSummary, setBookingSummary] = useState<any | null>(null);

  // Initialize URL queries
  useEffect(() => {
    const urlDoctor = searchParams.get('doctor');
    const urlTreatment = searchParams.get('treatment');
    if (urlDoctor && DOCTORS.includes(urlDoctor)) {
      setDoctorName(urlDoctor);
    }
    if (urlTreatment && TREATMENTS.includes(urlTreatment)) {
      setTreatmentName(urlTreatment);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone validation
    const phoneRegex = /^\+?([0-9\s-]{8,15})$/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number (8-15 digits).';
    }

    // Age validation
    if (age) {
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
        newErrors.age = 'Please enter a valid age (0-120).';
      }
    }

    if (!doctorName) newErrors.doctorName = 'Please select a specialist.';
    if (!treatmentName) newErrors.treatmentName = 'Please select a treatment.';
    if (!selectedDate) newErrors.selectedDate = 'Please pick an appointment date.';
    if (!selectedTime) newErrors.selectedTime = 'Please pick a time slot.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to errors if needed, or simply block
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedDate = selectedDate!.toISOString().split('T')[0];
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: fullName,
          phone_number: phoneNumber,
          email,
          age: age ? parseInt(age, 10) : undefined,
          gender: gender || undefined,
          doctor_name: doctorName,
          treatment_name: treatmentName,
          appointment_date: formattedDate,
          appointment_time: selectedTime,
          symptoms
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to record appointment.');
      }

      // Success Confetti burst
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#0ea5e9', '#0d9488', '#ffffff']
      });

      setBookingSummary(data.appointment);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'An error occurred during booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // If successfully booked, render the confirmation page layout
  if (bookingSummary) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto w-full bg-white rounded-3xl border border-slate-100 p-8 shadow-xl text-center flex flex-col items-center gap-6 print:border-0 print:shadow-none"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
          <CheckCircle className="h-10 w-10 animate-bounce" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Booking Confirmed!</h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Booking ID: <span className="text-primary font-bold">{bookingSummary.id}</span>
          </p>
        </div>

        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md">
          Thank you for choosing DentalCare Pro. Your appointment has been recorded successfully. Please arrive 15 minutes before your scheduled slot.
        </p>

        {/* Summary Table */}
        <div className="w-full bg-slate-50/50 rounded-2xl p-6 border border-slate-100/50 text-left space-y-4 text-sm md:text-base mt-2">
          <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <ClipboardList className="h-4.5 w-4.5 text-primary" />
            Appointment Summary
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <p className="text-slate-400 font-semibold">Patient Name</p>
              <p className="text-slate-700 font-bold mt-0.5">{bookingSummary.full_name}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Contact Phone</p>
              <p className="text-slate-700 font-bold mt-0.5">{bookingSummary.phone_number}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Specialist Doctor</p>
              <p className="text-slate-700 font-bold mt-0.5 flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5 text-primary shrink-0" />
                {bookingSummary.doctor_name}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Treatment Plan</p>
              <p className="text-slate-700 font-bold mt-0.5">{bookingSummary.treatment_name}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Scheduled Date</p>
              <p className="text-slate-700 font-bold mt-0.5 flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-primary shrink-0" />
                {bookingSummary.appointment_date}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Scheduled Time</p>
              <p className="text-slate-700 font-bold mt-0.5 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                {bookingSummary.appointment_time}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex gap-4 items-center justify-center mt-2 w-full sm:w-fit print:hidden">
          <Button variant="outline" onClick={handlePrint} className="flex items-center gap-1.5 rounded-xl">
            <Printer className="h-4.5 w-4.5" />
            Print Receipt
          </Button>
          <Button variant="primary" onClick={() => setBookingSummary(null)} className="rounded-xl shadow-none">
            Book Another
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleBookingSubmit} className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left Column: Date & Time Picker (Col span 5) */}
      <div className="lg:col-span-5 flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-sky-50 text-primary flex items-center justify-center font-bold text-sm">1</span>
            Select Date & Time
          </h2>
          <p className="text-xs text-slate-400">Pick a day on the calendar, then select an open time slot.</p>
        </div>

        <Calendar
          selectedDate={selectedDate}
          onDateChange={(d) => {
            setSelectedDate(d);
            setErrors((prev) => ({ ...prev, selectedDate: '' }));
          }}
        />
        {errors.selectedDate && (
          <span className="text-xs text-red-500 font-semibold -mt-3 pl-2">
            {errors.selectedDate}
          </span>
        )}

        {/* Time slot picker */}
        {selectedDate && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Available Time Slots:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time);
                      setErrors((prev) => ({ ...prev, selectedTime: '' }));
                    }}
                    className={`px-2 py-3.5 rounded-xl text-[10px] sm:text-xs font-semibold text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            {errors.selectedTime && (
              <span className="text-xs text-red-500 font-semibold pl-2">
                {errors.selectedTime}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Personal & Form details (Col span 7) */}
      <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 w-full">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-teal-50 text-accent flex items-center justify-center font-bold text-sm">2</span>
          Enter Patient Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Specialist Doctor *"
            value={doctorName}
            onChange={(e) => {
              setDoctorName(e.target.value);
              setErrors((prev) => ({ ...prev, doctorName: '' }));
            }}
            options={DOCTORS}
            placeholder="Choose Doctor"
            error={errors.doctorName}
          />

          <Select
            label="Dental Treatment *"
            value={treatmentName}
            onChange={(e) => {
              setTreatmentName(e.target.value);
              setErrors((prev) => ({ ...prev, treatmentName: '' }));
            }}
            options={TREATMENTS}
            placeholder="Choose Treatment"
            error={errors.treatmentName}
          />
        </div>

        <Input
          label="Full Name *"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setErrors((prev) => ({ ...prev, fullName: '' }));
          }}
          placeholder="Sarah Connor"
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address *"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder="sarah@example.com"
            error={errors.email}
          />
          <Input
            label="Phone Number *"
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setErrors((prev) => ({ ...prev, phoneNumber: '' }));
            }}
            placeholder="+1 (555) 123-4567"
            error={errors.phoneNumber}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Age"
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setErrors((prev) => ({ ...prev, age: '' }));
            }}
            placeholder="38"
            error={errors.age}
          />
          <Select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={['Female', 'Male', 'Non-binary', 'Prefer not to say']}
            placeholder="Select Gender"
          />
        </div>

        <Textarea
          label="Notes / Symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Please describe any tooth pain, structural damages, or targets you have..."
        />

        {/* Selected date preview */}
        {selectedDate && selectedTime && (
          <div className="text-xs md:text-sm font-semibold bg-sky-50 text-slate-700 p-4.5 rounded-2xl flex items-center justify-between border border-sky-100">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Selected Booking Slot:</p>
              <p className="text-primary font-bold mt-0.5">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
            </div>
            <UserCheck className="h-5 w-5 text-primary shrink-0" />
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full py-4 rounded-xl shadow-none font-bold mt-2"
        >
          Confirm Dental Booking
        </Button>
      </div>
    </form>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="w-full flex flex-col pb-24 bg-slate-50/20">
      {/* Header */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100 mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider">Appointment Booking</span>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">
              Schedule Your Premium Consultation
            </h1>
            <p className="text-sm md:text-base text-slate-500">
              Pick your preferred clinic dates, select your dental specialists, and enter details below. We save same-day slots for clinical pain relief.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 w-full">
        <Suspense fallback={
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 max-w-md mx-auto">
            <div className="animate-spin h-8 w-8 text-primary mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full" />
            <p className="text-sm text-slate-400">Loading booking configuration...</p>
          </div>
        }>
          <BookingFormInner />
        </Suspense>
      </section>
    </div>
  );
}
