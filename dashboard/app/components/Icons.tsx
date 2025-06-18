interface IconProps {
  className?: string;
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

export function ErrorIcon({ className }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

export function WarningIcon({ className }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className={className} 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}
