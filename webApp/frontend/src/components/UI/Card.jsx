import React from 'react';
import { cn } from './Button';

export const Card = ({ className, children, title, description, footer, contentClassName }) => {
  return (
    <div className={cn('glass-card p-6 rounded-2xl overflow-hidden', className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{title}</h3>}
          {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
        </div>
      )}
      <div className={cn('space-y-4', contentClassName)}>
        {children}
      </div>
      {footer && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          {footer}
        </div>
      )}
    </div>
  );
};
