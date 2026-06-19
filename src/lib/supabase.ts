import { createClient } from '@supabase/supabase-js';
import { Appointment } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Service role key is only available server-side (no NEXT_PUBLIC_ prefix)
// It bypasses RLS and is used for trusted server-side operations
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Check if the service key is a real key (not a placeholder)
const hasValidServiceKey =
  !!supabaseServiceKey &&
  !supabaseServiceKey.includes('your-service-role-key');

// Detect if keys are default placeholders or empty
export const isMockDatabase =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('placeholder-url') ||
  supabaseAnonKey.includes('placeholder-anon-key');

// Public anon client — used for client-side auth (login, session checks)
export const supabase = !isMockDatabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client — uses service role key to bypass RLS for trusted server-side writes.
// Only created when a real service key is provided, otherwise falls back to anon client.
export const supabaseAdmin =
  !isMockDatabase && hasValidServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
    : null;

// Initial mockup appointments to seed the database
const INITIAL_MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'f321db80-2a81-4203-b1d1-81f1eb520442',
    full_name: 'Sarah Connor',
    phone_number: '+1 (555) 123-4567',
    email: 'sarah.connor@example.com',
    age: 38,
    gender: 'Female',
    doctor_name: 'Dr. Emily Vance',
    treatment_name: 'Smile Makeover',
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    appointment_time: '10:00 AM',
    symptoms: 'Looking to get dental veneers and whiten my teeth before my wedding.',
    booking_created_at: new Date(Date.now() - 3600000).toISOString(),
    booking_status: 'confirmed',
    user_ip: '192.168.1.101',
    browser_info: 'Chrome / Windows 11'
  },
  {
    id: 'a123bc80-4a81-4203-b1d1-81f1eb520888',
    full_name: 'Marcus Wright',
    phone_number: '+1 (555) 987-6543',
    email: 'marcus.w@example.com',
    age: 42,
    gender: 'Male',
    doctor_name: 'Dr. Michael Chen',
    treatment_name: 'Dental Implants',
    appointment_date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // day after tomorrow
    appointment_time: '02:30 PM',
    symptoms: 'Need evaluation for a single tooth implant on lower molar.',
    booking_created_at: new Date(Date.now() - 7200000).toISOString(),
    booking_status: 'pending',
    user_ip: '192.168.1.102',
    browser_info: 'Safari / macOS'
  },
  {
    id: 'e456de90-5a81-4203-b1d1-81f1eb520999',
    full_name: 'John Connor',
    phone_number: '+1 (555) 234-5678',
    email: 'john.connor@example.com',
    age: 18,
    gender: 'Male',
    doctor_name: 'Dr. Emily Vance',
    treatment_name: 'Braces & Aligners',
    appointment_date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
    appointment_time: '09:00 AM',
    symptoms: 'Follow up routine adjustment for Invisalign braces.',
    booking_created_at: new Date(Date.now() - 172800000).toISOString(),
    booking_status: 'completed',
    user_ip: '192.168.1.103',
    browser_info: 'Firefox / Linux'
  },
  {
    id: 'd987bc80-1a81-4203-b1d1-81f1eb520111',
    full_name: 'Kate Brewster',
    phone_number: '+1 (555) 876-5432',
    email: 'kate.b@example.com',
    age: 35,
    gender: 'Female',
    doctor_name: 'Dr. Sarah Patel',
    treatment_name: 'Root Canal Treatment',
    appointment_date: new Date(Date.now() + 259200000).toISOString().split('T')[0], // 3 days later
    appointment_time: '11:30 AM',
    symptoms: 'Severe pain in the back upper tooth when taking hot drinks.',
    booking_created_at: new Date().toISOString(),
    booking_status: 'pending',
    user_ip: '192.168.1.104',
    browser_info: 'Chrome / iOS Mobile'
  }
];

// Helper to interact with the appointments database (with local storage mock fallback)
export const db = {
  async getAppointments(): Promise<Appointment[]> {
    if (isMockDatabase) {
      if (typeof window === 'undefined') return INITIAL_MOCK_APPOINTMENTS;
      const cached = localStorage.getItem('appointments');
      if (cached) {
        return JSON.parse(cached);
      } else {
        localStorage.setItem('appointments', JSON.stringify(INITIAL_MOCK_APPOINTMENTS));
        return INITIAL_MOCK_APPOINTMENTS;
      }
    }

    const { data, error } = await supabase!
      .from('appointments')
      .select('*')
      .order('booking_created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments from Supabase:', error);
      throw error;
    }
    return data || [];
  },

  async addAppointment(appointment: Appointment): Promise<Appointment> {
    if (isMockDatabase) {
      const appointments = await this.getAppointments();
      const newAppointment: Appointment = {
        ...appointment,
        id: crypto.randomUUID(),
        booking_created_at: new Date().toISOString(),
        booking_status: 'pending'
      };
      appointments.unshift(newAppointment);
      if (typeof window !== 'undefined') {
        localStorage.setItem('appointments', JSON.stringify(appointments));
      }
      return newAppointment;
    }

    // Use the admin client (service role) for inserts to bypass RLS
    const client = supabaseAdmin || supabase!;
    const { data, error } = await client
      .from('appointments')
      .insert([appointment])
      .select();

    if (error) {
      console.error('Error inserting appointment in Supabase:', error);
      throw error;
    }
    return data[0];
  },

  async updateAppointmentStatus(id: string, status: Appointment['booking_status']): Promise<Appointment> {
    if (isMockDatabase) {
      const appointments = await this.getAppointments();
      const index = appointments.findIndex((a) => a.id === id);
      if (index !== -1) {
        appointments[index].booking_status = status;
        if (typeof window !== 'undefined') {
          localStorage.setItem('appointments', JSON.stringify(appointments));
        }
        return appointments[index];
      }
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    const { data, error } = await supabase!
      .from('appointments')
      .update({ booking_status: status })
      .eq('id', id)
      .select();

    if (error) {
      console.error(`Error updating status for appointment ${id}:`, error);
      throw error;
    }
    return data[0];
  },

  async deleteAppointment(id: string): Promise<boolean> {
    if (isMockDatabase) {
      const appointments = await this.getAppointments();
      const filtered = appointments.filter((a) => a.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('appointments', JSON.stringify(filtered));
      }
      return true;
    }

    const { error } = await supabase!
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting appointment ${id}:`, error);
      throw error;
    }
    return true;
  }
};
