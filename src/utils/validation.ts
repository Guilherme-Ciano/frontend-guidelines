/**
 * @deprecated Use Zod schemas from schemas/ directory instead.
 * These functions are kept for backward compatibility but will be removed.
 * 
 * Use:
 * - emailSchema from '@company/frontend-core/schemas'
 * - cpfSchema from '@company/frontend-core/schemas'
 * - cnpjSchema from '@company/frontend-core/schemas'
 * - urlSchema from '@company/frontend-core/schemas'
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * @deprecated Use urlSchema from '@company/frontend-core/schemas' instead.
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * @deprecated Use cpfSchema from '@company/frontend-core/schemas' instead.
 */
export function isValidCpf(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanCpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i), 10) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(9), 10)) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i), 10) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCpf.charAt(10), 10)) {
    return false;
  }

  return true;
}

/**
 * @deprecated Use cnpjSchema from '@company/frontend-core/schemas' instead.
 */
export function isValidCnpj(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/\D/g, '');

  if (cleanCnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanCnpj)) {
    return false;
  }

  let length = cleanCnpj.length - 2;
  let numbers = cleanCnpj.substring(0, length);
  const digits = cleanCnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false;
  }

  length = length + 1;
  numbers = cleanCnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false;
  }

  return true;
}
