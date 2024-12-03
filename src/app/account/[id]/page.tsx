import { notFound } from 'next/navigation';
import AccountOperations from '@/components/account-operation';
import AccountStatement from '@/components/account-statement';
import { Metadata } from 'next';
import styles from './page.module.scss';
import { getBaseAccount } from '@/shared/data/account/get-account';
import { getMessage } from '@/messages';

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
  const account = await getBaseAccount(id);
  if (!account) {
    notFound();
  }

  return (
    <main className={styles.accountPage}>
      <h1 className={styles.title}>{getMessage('account', 'accountInfo', {iban: account.iban})}</h1>
      <AccountOperations
        accountId={account.id}
        initialBalance={account.balance}
      />
      <AccountStatement transactions={account.transactions} />
    </main>
  );
}
