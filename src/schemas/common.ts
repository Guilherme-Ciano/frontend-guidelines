import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido')
  .toLowerCase()
  .trim();

export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
  .regex(/[^A-Za-z0-9]/, 'Senha deve conter pelo menos um caractere especial');

export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, 'CPF inválido')
  .refine(
    (cpf: string) => {
      const cleanCpf = cpf.replace(/\D/g, '');
      if (cleanCpf.length !== 11 || /^(\d)\1+$/.test(cleanCpf)) {
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
      return digit === parseInt(cleanCpf.charAt(10), 10);
    },
    { message: 'CPF inválido' }
  );

export const cnpjSchema = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, 'CNPJ inválido')
  .refine(
    (cnpj: string) => {
      const cleanCnpj = cnpj.replace(/\D/g, '');
      if (cleanCnpj.length !== 14 || /^(\d)\1+$/.test(cleanCnpj)) {
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
      return result === parseInt(digits.charAt(1), 10);
    },
    { message: 'CNPJ inválido' }
  );

export const phoneSchema = z
  .string()
  .regex(
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/,
    'Telefone inválido. Use o formato: (XX) XXXXX-XXXX'
  );

export const urlSchema = z.string().url('URL inválida');

export const nonEmptyStringSchema = z
  .string()
  .min(1, 'Campo não pode estar vazio')
  .trim();

export const positiveNumberSchema = z.number().positive('Número deve ser positivo');

export const dateSchema = z.coerce.date({
  required_error: 'Data é obrigatória',
  invalid_type_error: 'Data inválida',
});

export const futureDateSchema = dateSchema.refine(
  (date: Date) => date > new Date(),
  { message: 'Data deve ser futura' }
);

export const pastDateSchema = dateSchema.refine(
  (date: Date) => date < new Date(),
  { message: 'Data deve ser passada' }
);
