import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: (SelectOption | string)[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5 relative">
        {label && (
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </label>
        )}
        
        <div className="relative w-full">
          <select
            ref={ref}
            className={`w-full px-4 py-3 bg-white border cursor-pointer appearance-none ${
              error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-primary focus:ring-sky-100'
            } rounded-xl text-slate-800 text-sm md:text-base outline-none transition-all focus:ring-4 pr-10`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt, idx) => {
              const value = typeof opt === 'string' ? opt : opt.value;
              const label = typeof opt === 'string' ? opt : opt.label;
              return (
                <option key={idx} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
          
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="h-4.5 w-4.5" />
          </div>
        </div>

        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
