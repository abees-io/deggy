import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 bg-white border ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 focus:border-primary focus:ring-sky-100'
          } rounded-xl text-slate-800 text-sm md:text-base outline-none transition-all focus:ring-4 placeholder-slate-400 resize-none ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
