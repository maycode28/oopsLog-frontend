import type { InputHTMLAttributes } from 'react';

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  error?: string;
}

export function AuthField({ label, icon, error, id, ...props }: AuthFieldProps) {
  const inputId = id ?? props.name;
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="flex items-center gap-2 font-headline font-bold text-sm text-primary px-1"
      >
        <span className="material-symbols-outlined text-lg">{icon}</span>
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={props.type ?? 'text'}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full h-14 px-5 rounded-xl
            bg-surface-container-low border-2
            font-medium placeholder:text-outline/40
            transition-all duration-200
            focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10
            ${error ? 'border-error' : 'border-transparent'}
          `}
          {...props}
        />
      </div>

      {error && (
        <p
          id={errorId}
          className="text-error text-xs font-medium px-1 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">error</span>
          {error}
        </p>
      )}
    </div>
  );
}