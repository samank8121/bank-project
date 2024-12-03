import { TransactionDTO } from '@/types/transaction-dto';
import { AccountDTO } from '@/types/accout-dto';
import Link from 'next/link';
import styles from './account-list.module.scss';
import { getMessage } from '@/messages';

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
          <h2 className={styles.accountTitle}>{getMessage('account', 'accountInfo', {iban: account.iban})}</h2>
          <p className={styles.accountBalance}>
            {getMessage('account', 'showBalance', {balance: account.balance.toFixed(2)})}
          </p>
          <Link className={styles.accountLink} href={`/account/${account.id}`}>
            {getMessage('account', 'viewDetails')}
          </Link>
        </div>
      ))}
    </div>
  );
}
