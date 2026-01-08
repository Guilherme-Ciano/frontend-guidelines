import { useState, useCallback } from 'react';
import { ZodSchema } from 'zod';
import { validateForm, validateField, FormFieldError } from '../validation';

export interface UseFormValidationOptions<T> {
  schema: ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data: T) => void | Promise<void>;
}

export interface UseFormValidationReturn<T> {
  values: Partial<T>;
  errors: Record<string, FormFieldError>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: unknown) => void;
  setError: (field: keyof T, error: FormFieldError | null) => void;
  validate: () => boolean;
  validateField: (field: keyof T) => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useFormValidation<T extends Record<string, unknown>>(
  options: UseFormValidationOptions<T>
): UseFormValidationReturn<T> {
  const { schema, initialValues = {}, onSubmit } = options;
  
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<Record<string, FormFieldError>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const setError = useCallback((field: keyof T, error: FormFieldError | null) => {
    setErrors((prev) => {
      if (error === null) {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      }
      return { ...prev, [field as string]: error };
    });
  }, []);

  const validate = useCallback((): boolean => {
    const result = validateForm(schema, values);
    
    if (result.isValid) {
      setErrors({});
      return true;
    }

    if (result.fieldErrors) {
      setErrors(result.fieldErrors);
    }
    
    return false;
  }, [schema, values]);

  const validateFieldFn = useCallback((field: keyof T): boolean => {
    const fieldValue = values[field];
    const error = validateField(schema, field as string, fieldValue);
    
    setError(field, error);
    return error === null;
  }, [schema, values, setError]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const validatedData = schema.parse(values) as T;
      await onSubmit?.(validatedData);
    } catch (error) {
      // Error handling is done by validate()
    } finally {
      setIsSubmitting(false);
    }
  }, [schema, values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isValid: Object.keys(errors).length === 0,
    isSubmitting,
    setValue,
    setError,
    validate,
    validateField: validateFieldFn,
    handleSubmit,
    reset,
  };
}
