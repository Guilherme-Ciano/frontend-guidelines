import { ZodSchema } from 'zod';
import { createValidator, ValidationResult } from './createValidator';

export interface AsyncValidationOptions {
  debounceMs?: number;
}

export function createAsyncValidator<T>(
  schema: ZodSchema<T>,
  options: AsyncValidationOptions = {}
): (data: unknown) => Promise<ValidationResult<T>> {
  const validator = createValidator<T>(schema);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (data: unknown): Promise<ValidationResult<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const result = validator(data);
        resolve(result as ValidationResult<T>);
      }, options.debounceMs ?? 300);
    });
  };
}

export async function validateAsync<T>(
  schema: ZodSchema<T>,
  data: unknown,
  options?: AsyncValidationOptions
): Promise<ValidationResult<T>> {
  const validator = createAsyncValidator<T>(schema, options);
  return validator(data);
}
