import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-3 bg-white border ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-primary focus:ring-sky-100'
          } rounded-xl text-slate-800 text-sm md:text-base outline-none transition-all focus:ring-4 placeholder-slate-400 ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
