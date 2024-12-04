import { z } from "zod";

export const parseError = (error: z.ZodError) => {
  let errorMsg = '';
  error.errors.forEach((e) => {
    const field = e.path[0];
    const message = e.message;
    errorMsg += `${field}: ${message} \n`;
  });
  return errorMsg;
};
