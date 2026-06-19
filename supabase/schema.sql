-- Supabase PostgreSQL Schema Configuration
-- Premium Dental Appointment Booking Platform

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER CHECK (age >= 0 AND age <= 120),
    gender TEXT,
    doctor_name TEXT NOT NULL,
    treatment_name TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    symptoms TEXT,
    booking_created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    booking_status TEXT NOT NULL DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    user_ip TEXT,
    browser_info TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public (anon) to insert appointments (for patient booking)
CREATE POLICY "Allow public insert" ON appointments
    FOR INSERT TO anon
    WITH CHECK (true);

-- Policy 2: Allow authenticated admin users to read, update, and delete bookings
CREATE POLICY "Allow admin select" ON appointments
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow admin update" ON appointments
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Allow admin delete" ON appointments
    FOR DELETE TO authenticated
    USING (true);

-- Create index on appointment_date for fast querying on dashboard
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(booking_status);
