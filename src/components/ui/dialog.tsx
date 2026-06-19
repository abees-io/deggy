'use client';

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = ''
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <DialogPrimitive.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className={`relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-xl border border-slate-100 focus:outline-none ${className}`}
                >
                  {/* Close Button */}
                  <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer">
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>

                  {/* Header */}
                  {(title || description) && (
                    <div className="mb-4 flex flex-col gap-1 pr-6">
                      {title && (
                        <DialogPrimitive.Title className="text-xl font-bold text-slate-800 tracking-tight">
                          {title}
                        </DialogPrimitive.Title>
                      )}
                      {description && (
                        <DialogPrimitive.Description className="text-sm text-slate-500">
                          {description}
                        </DialogPrimitive.Description>
                      )}
                    </div>
                  )}

                  {/* Children / Body */}
                  <div className="text-slate-700">{children}</div>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};
