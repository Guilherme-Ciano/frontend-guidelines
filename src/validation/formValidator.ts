import { ZodSchema, ZodError, ZodTypeAny, ZodObject } from 'zod';

export interface FormFieldError {
  message: string;
  code?: string;
}

export interface FormValidationResult<T> {
  isValid: boolean;
  data?: T;
  fieldErrors?: Record<string, FormFieldError>;
  generalError?: string;
}

export function validateForm<T>(
  schema: ZodSchema<T>,
  formData: unknown
): FormValidationResult<T> {
  try {
    const validatedData = schema.parse(formData) as T;
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, FormFieldError> = {};
      
      error.errors.forEach((err) => {
        const fieldName = err.path.join('.');
        fieldErrors[fieldName] = {
          message: err.message,
          code: err.code,
        };
      });

      return {
        isValid: false,
        fieldErrors,
      };
    }

    return {
      isValid: false,
      generalError: 'Erro de validação desconhecido',
    };
  }
}

export function validateField<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  fieldName: string,
  value: unknown
): FormFieldError | null {
  try {
    if (!('shape' in schema)) {
      return null;
    }
    
    const zodObject = schema as unknown as ZodObject<Record<string, ZodTypeAny>>;
    const fieldSchema = zodObject.shape[fieldName];
    if (!fieldSchema) {
      return null;
    }
    
    fieldSchema.parse(value);
    return null;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return {
        message: error.errors[0]?.message ?? 'Campo inválido',
        code: error.errors[0]?.code,
      };
    }
    return {
      message: 'Erro de validação',
    };
  }
}
