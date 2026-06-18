'use client';

import { validatePassword, type PasswordStrength } from '@/lib/passwords';

interface PasswordRequirementsProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordRequirements({ password, showRequirements = true }: PasswordRequirementsProps) {
  const strength = validatePassword(password);

  if (!showRequirements) return null;

  const requirements = [
    { key: 'minLength', label: 'More than 8 characters', met: strength.requirements.minLength },
    { key: 'uppercase', label: 'At least one uppercase letter (A-Z)', met: strength.requirements.hasUppercase },
    { key: 'lowercase', label: 'At least one lowercase letter (a-z)', met: strength.requirements.hasLowercase },
    { key: 'number', label: 'At least one number (0-9)', met: strength.requirements.hasNumber },
    { key: 'special', label: 'One special character (!@#$%^&*...)', met: strength.requirements.hasSpecialChar },
  ];

  return (
    <div className="mt-3 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
      <p className="mb-2 text-xs font-semibold text-blue-900 dark:text-blue-200">Password requirements:</p>
      <ul className="space-y-1">
        {requirements.map((req) => (
          <li key={req.key} className="flex items-center gap-2 text-xs">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full ${req.met ? 'bg-green-500 text-white' : 'border border-blue-300 dark:border-blue-600'}`}>
              {req.met && <span className="text-xs">✓</span>}
            </span>
            <span className={req.met ? 'text-green-700 dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}>
              {req.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
