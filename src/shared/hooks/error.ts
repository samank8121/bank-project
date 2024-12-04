import { useState } from 'react';
import { z } from 'zod';

export type ErrorType = { path: string; message: string };

export const useError = () => {
  const [currentErrors, setCurrentErrors] = useState<ErrorType[]>([]);
  const getError = <FieldType>(field: FieldType): string => {
    const error = currentErrors.filter((e) => e.path === field);
    return error && error.length > 0 ? error[0].message : '';
  };

  const setError = (error: z.ZodError) => {
    if (error instanceof z.ZodError) {
      const result = error.errors.map((ce) => {
        return {
          path: ce.path.toString(),
          message: ce.message,
        };
      });
      setCurrentErrors(result);
    }
  };
  return { getError, setError, currentErrors };
};
