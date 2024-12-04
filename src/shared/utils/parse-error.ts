import { z } from 'zod';

export const parseError = (error: z.ZodError) => {
  const result = error.errors.map((ce) => {
    return {
      path: ce.path.toString(),
      message: ce.message,
    };
  });
  return result;
};
