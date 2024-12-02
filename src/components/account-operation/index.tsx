'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPost } from '@/shared/utils/fetch-helper';
import styles from './account-operation.module.scss';

type AccountOperationsProps = {
  accountId: string;
  initialBalance: number;
};

const AccountOperations: FC<AccountOperationsProps> = ({
  initialBalance,
  accountId,
}) => {
  const [balance, setBalance] = useState(initialBalance);
  const [amount, setAmount] = useState('');
  const [toIban, setToIban] = useState('');
  const router = useRouter();

  const handleOperation = async (operation: string) => {
    const endpoint = `/api/account/${operation}`;
    const response = await fetchPost({
      endpoint,
      body: JSON.stringify({
        accountId: accountId,
        amount: parseFloat(amount),
        ...(operation === 'transfer' && { toIban }),
      }),
    });

    const data = await response.json();
    if (data.success) {
      setBalance(data.balance);
      setAmount('');
      setToIban('');
      router.refresh();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account Operations</h2>
      <p className={styles.balance}>Current Balance: ${balance.toFixed(2)}</p>
      <div className={styles.inputGroup}>
        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder='Amount'
          className={styles.input}
        />
        {['deposit', 'withdraw'].map((op) => (
          <button key={op}  className={`${styles.button} ${styles[op]}`} onClick={() => handleOperation(op)}>
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.inputGroup}>
        <input
          type='text'
          value={toIban}
          onChange={(e) => setToIban(e.target.value)}
          placeholder='To IBAN'
          className={styles.input}
        />
        <button className={`${styles.button} ${styles.transfer}`} onClick={() => handleOperation('transfer')}>Transfer</button>
      </div>
    </div>
  );
};
export default AccountOperations;
