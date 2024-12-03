import { TransactionDTO } from '@/types/transaction-dto';
import { FC } from 'react';
import styles from './account-statement.module.scss'

type AccountStatementProps = {
  transactions?: TransactionDTO[];
};

const AccountStatement: FC<AccountStatementProps> = ({ transactions }) => {
  const getRunningBalance = (index: number) => {
    let result = 0;
    if (transactions) {
      result = transactions
        .slice(index, transactions.length)
        .reduce((sum, t) => sum + t.amount, 0);
    }
    return result;
  };
  return (
    <div className={styles.accountStatement}>
      <h2 className={styles.title}>Account Statement</h2>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.tableHeaderCell}>Date</th>
            <th className={styles.tableHeaderCell}>Type</th>
            <th className={styles.tableHeaderCell}>Amount</th>
            <th className={styles.tableHeaderCell}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => {
            return (
              <tr key={transaction.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{transaction.date.toLocaleString()}</td>
                <td className={styles.tableCell}>{transaction.type}</td>
                <td className={styles.tableCell}>{transaction.amount.toFixed(2)}</td>
                <td className={styles.tableCell}>{getRunningBalance(index).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AccountStatement;
