import { useState } from 'react';
import type { ZodSchema } from 'zod';

export type FormErrors<T> = Record<keyof T, string | null>;

export function useSchemaForm<T extends {}>(
  schema: ZodSchema<T>,
  defaultValue: T,
): {
  formData: T;
  setFormData: (data: T) => void;
  formErrors: FormErrors<T>;
  validateForm: (data: T) => boolean;
} {
  const [formData, setFormData] = useState<T>(defaultValue);
  const [formErrors, setFormErrors] = useState<FormErrors<T>>(
    getDefaultFormErrors(defaultValue),
  );

  const validateForm = (newValue: T): boolean => {
    const { success, errors } = validateBySchema(schema, newValue);

    setFormData(newValue);
    setFormErrors(errors);

    return success;
  };

  return {
    formData,
    setFormData,
    formErrors,
    validateForm,
  };
}

function validateBySchema<T extends {}>(
  schema: ZodSchema<T>,
  value: T,
): {
  success: boolean;
  errors: FormErrors<T>;
} {
  const errors = getDefaultFormErrors(value);
  const result = schema.safeParse(value);

  if (result.success) {
    return {
      success: true,
      errors,
    };
  }

  const issues = result.error.issues;

  for (const issue of issues) {
    const key = issue.path[0] as keyof T;
    errors[key] = issue.message;
  }

  return {
    success: false,
    errors,
  };
}

function getDefaultFormErrors<T extends {}>(value: T): FormErrors<T> {
  const entries = Object.entries(value).map(([k, _]) => [k, null]);
  return Object.fromEntries(entries);
}
