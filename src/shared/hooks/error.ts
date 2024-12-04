import { useState } from 'react';
import { z } from 'zod';
import { parseError } from '../utils/parse-error';

export type ErrorType = { path: string; message: string };

export const useError = () => {
  const [currentErrors, setCurrentErrors] = useState<ErrorType[]>([]);
  const getError = <FieldType>(field: FieldType): string => {
    const error = currentErrors.filter((e) => e.path === field);
    return error && error.length > 0 ? error[0].message : '';
  };

  const setError = (error: z.ZodError | ErrorType[]) => {
    let result = Array.isArray(error) ? error : [];
    if (error instanceof z.ZodError) {
      result = parseError(error);
    }
    setCurrentErrors(result);
  };
  return { getError, setError, currentErrors };
};
