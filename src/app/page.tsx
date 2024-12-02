import AccountList from '@/components/account-list';
import prisma from '@/shared/data/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page',
};
export default async function Home() {
  const accounts = await prisma.account.findMany({
    include: {
      transactions: {
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Bank Accounts</h1>
      <Link href='/account/create'>Create New Account</Link>
      <AccountList accounts={accounts} />
    </main>
  );
}
