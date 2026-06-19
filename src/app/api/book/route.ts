import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/supabase';
import { Appointment } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      phone_number,
      email,
      age,
      gender,
      doctor_name,
      treatment_name,
      appointment_date,
      appointment_time,
      symptoms
    } = body;

    // Server-side validation
    if (!full_name || !phone_number || !email || !doctor_name || !treatment_name || !appointment_date || !appointment_time) {
      return NextResponse.json(
        { error: 'Missing required booking fields.' },
        { status: 400 }
      );
    }

    // Capture User IP and Browser Info
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const userAgent = headersList.get('user-agent') || 'Unknown';
    
    // Choose appropriate IP address
    const userIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || '127.0.0.1');

    const appointmentData: Appointment = {
      full_name,
      phone_number,
      email,
      age: age ? parseInt(age, 10) : undefined,
      gender: gender || 'Not Specified',
      doctor_name,
      treatment_name,
      appointment_date,
      appointment_time,
      symptoms: symptoms || '',
      booking_status: 'pending',
      user_ip: userIp,
      browser_info: userAgent
    };

    // Insert record into Supabase or mock database
    const savedAppointment = await db.addAppointment(appointmentData);

    return NextResponse.json(
      {
        success: true,
        bookingId: savedAppointment.id,
        appointment: savedAppointment
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API booking error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
