import { z } from 'zod';
import { getMessage } from '@/messages';
import { isValidIBAN } from '../utils/iban';

export const createAccountSchema = () =>
  z.object({
    iban: z
      .string({ message: getMessage('account', 'invalidIban') })
      .min(1, { message: getMessage('account', 'invalidIban') }).refine((d) => isValidIBAN(d), {
        message: getMessage('account', 'invalidIban'),
      }),
    initialBalance: z
      .number()
      .positive({ message: getMessage('account', 'positiveAmount') })
      .refine((value) => Number.isFinite(value), {
        message: getMessage('account', 'positiveAmount'),
      }),
  });

export type CreateAccountSchema = z.infer<
  ReturnType<typeof createAccountSchema>
>;
