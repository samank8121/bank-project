import { notFound } from 'next/navigation';
import AccountOperations from '@/components/account-operation';
import AccountStatement from '@/components/account-statement';
import prisma from '@/shared/data/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Account Page",
  description: "Account Page",
};

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const account = await prisma.account.findUnique({
    where: { id: id },
    include: {
      transactions: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });
  if (!account) {
    notFound();
  }

  return (
    <main>
      <h1>Account: {account.iban}</h1>
      <AccountOperations
        accountId={account.id}
        initialBalance={account.balance}
      />
      <AccountStatement transactions={account.transactions} />
    </main>
  );
}
