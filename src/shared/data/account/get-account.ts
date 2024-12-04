import { unstable_noStore as noStore } from 'next/cache';
import prisma from "../prisma";

export const getAllAcounts = async () => {
  noStore();
  const accounts = await prisma.account.findMany({
    include: {
      transactions: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
  return accounts;
};
export const getBaseAccount = async (id:string) => {
  noStore();
  const account = await prisma.account.findUnique({
    where: { id },
    include: {
      transactions: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
  return account;
};
