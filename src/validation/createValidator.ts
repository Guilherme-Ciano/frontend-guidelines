import { ZodSchema, ZodError } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export function createValidator<T>(schema: ZodSchema<T>) {
  return (data: unknown): ValidationResult<T> => {
    try {
      const validatedData = schema.parse(data) as T;
      return {
        success: true,
        data: validatedData,
      };
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        return {
          success: false,
          errors,
        };
      }
      return {
        success: false,
        errors: { _general: 'Erro de validação desconhecido' },
      };
    }
  };
}

export function safeParse<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  const validator = createValidator<T>(schema);
  return validator(data);
}

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data) as T;
}
