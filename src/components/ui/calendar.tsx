'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate?: Date;
  onDateChange: (date: Date) => void;
  minDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
  minDate = new Date()
}) => {
  // Normalize minDate to start of day
  const normalizedMinDate = new Date(minDate);
  normalizedMinDate.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const initial = selectedDate || new Date();
    return new Date(initial.getFullYear(), initial.getMonth(), 1);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Helper to get number of days in the month
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();

  // Helper to get day of the week for the first day of the month (0 = Sunday)
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Array of days for the grid
  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null); // empty cells before first day
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const isDisabled = (day: number) => {
    const checkDate = new Date(year, month, day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < normalizedMinDate;
  };

  const handleDayClick = (day: number) => {
    if (isDisabled(day)) return;
    const date = new Date(year, month, day);
    onDateChange(date);
  };

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-slate-800 text-sm md:text-base">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-full hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, idx) => (
          <span key={idx} className="text-xs font-bold text-slate-400 py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysArray.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const disabled = isDisabled(day);
          const active = isSelected(day);
          const current = isToday(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={disabled}
              onClick={() => handleDayClick(day)}
              className={`aspect-square w-full rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                active
                  ? 'bg-primary text-white hover:bg-primary-hover shadow-md shadow-sky-100'
                  : disabled
                  ? 'text-slate-200 cursor-not-allowed pointer-events-none'
                  : current
                  ? 'border border-primary text-primary hover:bg-sky-50'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};
