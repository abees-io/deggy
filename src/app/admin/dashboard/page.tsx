'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { db, isMockDatabase } from '@/lib/supabase';
import { Appointment } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  CalendarDays,
  Clock,
  User,
  Activity,
  Check,
  X,
  Trash2,
  LogOut,
  Search,
  Filter,
  BarChart3,
  CalendarCheck,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Stethoscope,
  Smile
} from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Table Control States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [treatmentFilter, setTreatmentFilter] = useState('All');
  const [sortField, setSortField] = useState<'appointment_date' | 'full_name'>('appointment_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Detail Modal State
  const [activeDetail, setActiveDetail] = useState<Appointment | null>(null);

  // Authentication check
  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession') || localStorage.getItem('sb-admin-token');
    if (!adminSession) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
      fetchAppointments();
    }
  }, [router]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await db.getAppointments();
      setAppointments(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: Appointment['booking_status']) => {
    try {
      const updated = await db.updateAppointmentStatus(id, status);
      setAppointments((prev) => prev.map((a) => (a.id === id ? updated : a)));
      if (activeDetail && activeDetail.id === id) {
        setActiveDetail(updated);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating booking status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this booking?')) return;
    try {
      await db.deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setActiveDetail(null);
    } catch (err) {
      console.error(err);
      alert('Error deleting booking.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    localStorage.removeItem('sb-admin-token');
    router.push('/admin/login');
  };

  // 1. CALCULATE STATISTICS METRICS
  const metrics = useMemo(() => {
    const total = appointments.length;
    
    // Check if appointment is today
    const todayStr = new Date().toISOString().split('T')[0];
    const today = appointments.filter((a) => a.appointment_date === todayStr).length;

    const pending = appointments.filter((a) => a.booking_status === 'pending').length;
    const confirmed = appointments.filter((a) => a.booking_status === 'confirmed').length;

    return { total, today, pending, confirmed };
  }, [appointments]);

  // 2. FILTER & SORT APPOINTMENTS
  const processedAppointments = useMemo(() => {
    let result = [...appointments];

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.full_name.toLowerCase().includes(query) ||
          a.email.toLowerCase().includes(query) ||
          a.phone_number.toLowerCase().includes(query)
      );
    }

    // Dropdown filters
    if (statusFilter !== 'All') {
      result = result.filter((a) => a.booking_status === statusFilter);
    }
    if (doctorFilter !== 'All') {
      result = result.filter((a) => a.doctor_name === doctorFilter);
    }
    if (treatmentFilter !== 'All') {
      result = result.filter((a) => a.treatment_name === treatmentFilter);
    }

    // Sort operations
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'appointment_date') {
        comparison = a.appointment_date.localeCompare(b.appointment_date);
      } else if (sortField === 'full_name') {
        comparison = a.full_name.localeCompare(b.full_name);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [appointments, searchQuery, statusFilter, doctorFilter, treatmentFilter, sortField, sortDirection]);

  // 3. PAGINATION
  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedAppointments, currentPage]);

  const totalPages = Math.ceil(processedAppointments.length / ITEMS_PER_PAGE);

  // 4. ANALYTICS CALCULATIONS
  const analyticsData = useMemo(() => {
    // a. Treatment popularity
    const treatmentsCount: Record<string, number> = {};
    // b. Doctor workload
    const doctorsCount: Record<string, number> = {};

    appointments.forEach((a) => {
      treatmentsCount[a.treatment_name] = (treatmentsCount[a.treatment_name] || 0) + 1;
      doctorsCount[a.doctor_name] = (doctorsCount[a.doctor_name] || 0) + 1;
    });

    return {
      treatments: Object.entries(treatmentsCount).map(([name, count]) => ({ name, count })),
      doctors: Object.entries(doctorsCount).map(([name, count]) => ({ name, count }))
    };
  }, [appointments]);

  if (!isAuthorized) return null;

  return (
    <div className="w-full flex-1 bg-slate-50/50 pb-24">
      {/* Top Header */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md">
              <Smile className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                Clinical Admin Panel
                {isMockDatabase && (
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Demo Mode
                  </span>
                )}
              </h1>
              <p className="text-xs text-slate-400 font-medium">Manage dental appointments, schedule states, and check metrics.</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs md:text-sm font-bold bg-slate-800 hover:bg-slate-700 hover:text-white px-4 py-2.5 rounded-full border border-slate-700 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4 text-rose-400" />
            Log Out
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col gap-8">
        {/* 1. METRICS OVERVIEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Appointments', value: metrics.total, icon: CalendarDays, color: 'border-slate-200 text-slate-800 bg-white' },
            { label: "Today's Bookings", value: metrics.today, icon: Clock, color: 'border-sky-200 text-primary bg-sky-50/30' },
            { label: 'Pending Approvals', value: metrics.pending, icon: HelpCircle, color: 'border-amber-200 text-amber-600 bg-amber-50/20' },
            { label: 'Confirmed Bookings', value: metrics.confirmed, icon: CheckCircle, color: 'border-emerald-200 text-emerald-600 bg-emerald-50/20' }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`border p-6 rounded-3xl shadow-sm flex flex-col gap-4 justify-between transition-transform duration-300 hover:scale-102 ${card.color}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs md:text-sm font-semibold tracking-wide uppercase text-slate-400">
                    {card.label}
                  </span>
                  <Icon className="h-5 w-5 opacity-70 shrink-0" />
                </div>
                <h3 className="text-3xl font-black tracking-tight">{card.value}</h3>
              </div>
            );
          })}
        </div>

        {/* 2. ANALYTICS CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Requested Treatments */}
          <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-sm flex flex-col gap-6">
            <h3 className="font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Treatment Demand
            </h3>
            
            {analyticsData.treatments.length === 0 ? (
              <p className="text-sm text-slate-400 py-12 text-center">No booking data available yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {analyticsData.treatments.map((t, idx) => {
                  const maxVal = Math.max(...analyticsData.treatments.map((item) => item.count), 1);
                  const percentage = (t.count / maxVal) * 100;
                  return (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>{t.name}</span>
                        <span className="text-primary">{t.count} booked</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className="bg-primary h-full rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chart 2: Doctor Workload */}
          <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-sm flex flex-col gap-6">
            <h3 className="font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-accent" />
              Doctor Performance workload
            </h3>

            {analyticsData.doctors.length === 0 ? (
              <p className="text-sm text-slate-400 py-12 text-center">No workloads recorded.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {analyticsData.doctors.map((d, idx) => {
                  const maxVal = Math.max(...analyticsData.doctors.map((item) => item.count), 1);
                  const percentage = (d.count / maxVal) * 100;
                  return (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>{d.name}</span>
                        <span className="text-accent">{d.count} tasks</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className="bg-accent h-full rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 3. APPOINTMENTS MANAGER TABLE */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col gap-6 py-6">
          {/* Table Toolbar Header */}
          <div className="px-6 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-slate-50 pb-5">
            <h3 className="font-bold text-slate-800 text-base md:text-lg flex items-center gap-2 mr-auto">
              <CalendarCheck className="h-5 w-5 text-primary" />
              Appointments List
            </h3>
            
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 py-2.5 text-xs rounded-xl"
                />
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-32">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-white cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sorting Toggle */}
              <button
                onClick={() => {
                  setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors bg-white text-slate-600 cursor-pointer"
              >
                Sort: {sortField === 'appointment_date' ? 'Date' : 'Name'}
                <span className="text-[10px] text-slate-400">({sortDirection.toUpperCase()})</span>
              </button>
            </div>
          </div>

          {/* Actual Table Element */}
          <div className="overflow-x-auto w-full">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin h-8 w-8 text-primary mx-auto border-2 border-primary border-t-transparent rounded-full mb-3" />
                <p className="text-xs text-slate-400">Fetching appointment lists...</p>
              </div>
            ) : processedAppointments.length === 0 ? (
              <p className="text-sm text-slate-400 py-16 text-center">No matching appointment records found.</p>
            ) : (
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold border-y border-slate-100 uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Patient Details</th>
                    <th className="px-6 py-4">Specialist Doctor</th>
                    <th className="px-6 py-4">Dental Treatment</th>
                    <th className="px-6 py-4">Schedule Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {paginatedAppointments.map((app) => {
                    const statusColors = {
                      pending: 'bg-amber-50 text-amber-700 border-amber-100',
                      confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                      completed: 'bg-sky-50 text-sky-700 border-sky-100',
                      cancelled: 'bg-rose-50 text-rose-700 border-rose-100'
                    };

                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-50/40 transition-colors cursor-pointer"
                        onClick={() => setActiveDetail(app)}
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{app.full_name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{app.email}</div>
                          <div className="text-[10px] text-slate-400">{app.phone_number}</div>
                        </td>
                        <td className="px-6 py-4">{app.doctor_name}</td>
                        <td className="px-6 py-4">{app.treatment_name}</td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800">{app.appointment_date}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{app.appointment_time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] border font-bold uppercase tracking-wider ${statusColors[app.booking_status]}`}>
                            {app.booking_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {app.booking_status === 'pending' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id!, 'confirmed')}
                                className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                                title="Confirm Booking"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            {app.booking_status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id!, 'completed')}
                                className="p-1.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
                                title="Mark Completed"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {app.booking_status !== 'cancelled' && app.booking_status !== 'completed' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id!, 'cancelled')}
                                className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                                title="Cancel Booking"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(app.id!)}
                              className="p-1.5 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                              title="Delete Permanently"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Toolbar Footer */}
          {totalPages > 1 && (
            <div className="px-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, processedAppointments.length)} of{' '}
                {processedAppointments.length} bookings
              </span>
              
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Dialog Modal */}
      <AnimatePresence>
        {activeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetail(null)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-800 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-primary" />
                Appointment Detail ID
              </h2>

              <div className="space-y-4 text-xs md:text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Patient Name:</span>
                    <p className="font-bold text-slate-800 mt-0.5">{activeDetail.full_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Contact details:</span>
                    <p className="font-medium text-slate-800 mt-0.5">{activeDetail.phone_number}</p>
                    <p className="text-xs text-slate-400">{activeDetail.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Age / Gender:</span>
                    <p className="font-medium text-slate-700 mt-0.5">
                      {activeDetail.age ? `${activeDetail.age} Yrs` : 'N/A'} ({activeDetail.gender})
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Booking Status:</span>
                    <p className="font-bold text-slate-800 mt-0.5 uppercase tracking-wide text-xs text-primary">
                      {activeDetail.booking_status}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Specialist:</span>
                    <p className="font-medium text-slate-700 mt-0.5">{activeDetail.doctor_name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Treatment:</span>
                    <p className="font-medium text-slate-700 mt-0.5">{activeDetail.treatment_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Scheduled Date:</span>
                    <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-primary shrink-0" />
                      {activeDetail.appointment_date}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Scheduled Time:</span>
                    <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      {activeDetail.appointment_time}
                    </p>
                  </div>
                </div>

                {activeDetail.symptoms && (
                  <div className="border-t border-slate-50 pt-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Symptoms / Notes:</span>
                    <p className="text-slate-500 mt-0.5 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100/50 leading-relaxed italic">
                      "{activeDetail.symptoms}"
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3 text-[10px] text-slate-400">
                  <div>
                    <span>Submit Remote IP:</span>
                    <p className="font-medium">{activeDetail.user_ip || 'N/A'}</p>
                  </div>
                  <div>
                    <span>Browser Client:</span>
                    <p className="font-medium truncate" title={activeDetail.browser_info}>
                      {activeDetail.browser_info || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update Options in Modal */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-2.5 justify-end">
                {activeDetail.booking_status === 'pending' && (
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStatus(activeDetail.id!, 'confirmed')}
                    className="py-2 px-4 text-xs font-bold rounded-xl"
                  >
                    Confirm Booking
                  </Button>
                )}
                {activeDetail.booking_status === 'confirmed' && (
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStatus(activeDetail.id!, 'completed')}
                    className="py-2 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700"
                  >
                    Mark Completed
                  </Button>
                )}
                {activeDetail.booking_status !== 'cancelled' && activeDetail.booking_status !== 'completed' && (
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus(activeDetail.id!, 'cancelled')}
                    className="py-2 px-4 text-xs font-bold rounded-xl hover:bg-rose-50 text-rose-500"
                  >
                    Cancel Booking
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleDelete(activeDetail.id!)}
                  className="py-2 px-4 text-xs font-bold rounded-xl hover:bg-rose-50 text-rose-500 flex items-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
