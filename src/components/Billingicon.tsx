// components/icons/BillingIcon.tsx
import React from 'react';

export function BillingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      className="w-6 h-6"
    >
      <path d="M12 1v22" />
      <path d="M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z" />
      <path d="M12 10v4" />
      <circle cx={12} cy={18} r={1} />
    </svg>
  );
}   
