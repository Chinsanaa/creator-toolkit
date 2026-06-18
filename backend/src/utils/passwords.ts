/**
 * Password validation utility for secure password requirements
 * Requirements:
 * - More than 8 characters (minimum 9)
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */

export interface PasswordStrength {
  isValid: boolean;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

const REQUIREMENTS = {
  minLength: 9, // More than 8 characters
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  specialChar: /[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]/,
};

/**
 * Validates a password against security requirements
 */
export function validatePassword(password: string): PasswordStrength {
  return {
    isValid:
      password.length >= REQUIREMENTS.minLength &&
      REQUIREMENTS.uppercase.test(password) &&
      REQUIREMENTS.lowercase.test(password) &&
      REQUIREMENTS.number.test(password) &&
      REQUIREMENTS.specialChar.test(password),
    requirements: {
      minLength: password.length >= REQUIREMENTS.minLength,
      hasUppercase: REQUIREMENTS.uppercase.test(password),
      hasLowercase: REQUIREMENTS.lowercase.test(password),
      hasNumber: REQUIREMENTS.number.test(password),
      hasSpecialChar: REQUIREMENTS.specialChar.test(password),
    },
  };
}

/**
 * Gets a human-readable error message for the first unmet requirement
 */
export function getPasswordErrorMessage(password: string): string | null {
  const strength = validatePassword(password);

  if (!strength.requirements.minLength) {
    return `Password must be more than 8 characters (currently ${password.length})`;
  }
  if (!strength.requirements.hasUppercase) {
    return 'Password must contain at least one uppercase letter (A-Z)';
  }
  if (!strength.requirements.hasLowercase) {
    return 'Password must contain at least one lowercase letter (a-z)';
  }
  if (!strength.requirements.hasNumber) {
    return 'Password must contain at least one number (0-9)';
  }
  if (!strength.requirements.hasSpecialChar) {
    return 'Password must contain at least one special character (!@#$%^&*...)';
  }

  return null;
}
