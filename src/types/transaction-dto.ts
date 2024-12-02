export type TransactionDTO = {
  id: string;
  date: Date;
  amount: number;
  type: string;
  accountId: string;
  toAccountIban: string | null;
};
