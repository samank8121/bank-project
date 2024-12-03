import AccountList from '@/components/account-list';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';
import { getAllAcounts } from '@/shared/data/account/get-account';
import { getMessage } from '@/messages';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page',
};
export default async function Home() {
  const accounts = await getAllAcounts();

  return (
    <main className={styles.mainPage}>
      <h1 className={styles.title}>{getMessage('account', 'mainPageTitle')}</h1>
      <Link href='/account/create'>{getMessage('account', 'createNewAccount')}</Link>
      <AccountList accounts={accounts} />
    </main>
  );
}
