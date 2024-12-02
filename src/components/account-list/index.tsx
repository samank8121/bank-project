import { TransactionDTO } from '@/types/transaction-dto';
import { AccountDTO } from '@/types/accout-dto';
import Link from 'next/link';
import styles from './account-list.module.scss';

type AccountWithTransactions = AccountDTO & { transactions: TransactionDTO[] };

export default function AccountList({
  accounts,
}: {
  accounts: AccountWithTransactions[];
}) {
  return (
    <div className={styles.accountList}>
      {accounts.map((account) => (
        <div className={styles.accountItem} key={account.id}>
          <h2 className={styles.accountTitle}>Account: {account.iban}</h2>
          <p className={styles.accountBalance}>
            Balance: ${account.balance.toFixed(2)}
          </p>
          <Link className={styles.accountLink} href={`/account/${account.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
