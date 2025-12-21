'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'error', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    error: 'bg-red-500',
    success: 'bg-secondary',
    info: 'bg-primary',
  };

  return (
    <div className="fixed bottom-4 md:right-4 z-1001 animate-[slideUp_0.3s_ease-out]">
      <div className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md`}>
        <span className="text-xl">{type === 'error' ? '⚠️' : type === 'success' ? '✓' : 'ℹ️'}</span>
        <p className="text-sm flex-1">{message}</p>
        <button onClick={onClose} className="text-white/80 hover:text-white text-xl">×</button>
      </div>
    </div>
  );
}
