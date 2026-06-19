import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-sm md:text-base px-6 py-2.5 md:px-8 md:py-3 active:scale-[0.98]';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover shadow-md shadow-sky-100 hover:shadow-lg hover:shadow-sky-200 focus:ring-sky-500',
      secondary: 'bg-accent text-white hover:bg-accent-hover shadow-md shadow-teal-100 hover:shadow-lg hover:shadow-teal-200 focus:ring-teal-500',
      outline: 'border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-slate-400',
      text: 'bg-transparent text-primary hover:text-primary-hover p-0 focus:ring-transparent'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4.5 w-4.5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
