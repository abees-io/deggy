export interface Appointment {
  id?: string;
  full_name: string;
  phone_number: string;
  email: string;
  age?: number;
  gender: string;
  doctor_name: string;
  treatment_name: string;
  appointment_date: string;
  appointment_time: string;
  symptoms?: string;
  booking_created_at?: string;
  booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  user_ip?: string;
  browser_info?: string;
}

export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialization: string;
  about: string;
  availableDays: string[];
  photoUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  procedureSteps: string[];
  duration: string;
  price: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Appointments' | 'Treatments' | 'Pricing' | 'Insurance' | 'Emergency Care';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  treatment: string;
  isVerified: boolean;
}
