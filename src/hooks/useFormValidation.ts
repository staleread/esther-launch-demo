import type { FormErrors } from '@/types/validation.types';
import { z, ZodSchema, ZodIssue } from 'zod';
import { useState } from 'react';

export default function useFormValidation<T>(
  schema: ZodSchema<T>,
  defaultValue: T,
): {
  formData: T,
  setFormData: (data: T) => void,
  formErrors: FormErrors<T>,
  validateForm: (data: T) => boolean,
} {
  const [formData, setFormData] = useState<T>(defaultValue);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>(getDefaultFormErrors(defaultValue));

  console.log(formErrors);

  const validateForm = (newValue: T): boolean => {
    const { success, errors } = validateBySchema(schema, newValue);

    setFormData(newValue);
    setFormErrors(errors);

    return success;
  }

  return {
    formData,
    setFormData,
    formErrors,
    validateForm,
  }
}

function validateBySchema<T>(
  schema: ZodSchema<T>,
  value: T,
): {
  success: boolean;
  errors: FormErrors<T>
} {
  const errors = getDefaultFormErrors(value);
  const result = schema.safeParse(value);

  if (result.success) {
    return {
      success: true,
      errors,
    }
  }

  result.error.issues.forEach(i => {
    const key = i.path[0];
    errors[key] = i.message;
  });

  return {
    success: false,
    errors,
  }
}

function getDefaultFormErrors(value: T): FormErrors<T> {
  const entries = Object.entries(value).map(([k, v]) => [k, null]);
  return Object.fromEntries(entries);
}
