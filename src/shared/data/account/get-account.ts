import prisma from "../prisma";

export const getAllAcounts = async () => {
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
