'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPost } from '@/shared/utils/fetch-helper';
import styles from './account-operation.module.scss';
import RadioGroup from '../radio-group';
import { useMessage } from '@/shared/hooks/useMessage';
import { capitalizeFirstLetter } from '@/shared/utils/capitalize';
import { getMessage } from '@/messages';

type AccountOperationsProps = {
  accountId: string;
  initialBalance: number;
};

type OperationType = 'deposit' | 'withdraw' | 'transfer';
const options: { label: string; value: OperationType }[] = [
  { label: capitalizeFirstLetter(getMessage('account', 'deposit')), value: 'deposit' },
  { label: capitalizeFirstLetter(getMessage('account','withdraw')), value: 'withdraw' },
  { label: capitalizeFirstLetter(getMessage('account','transfer')), value: 'transfer' },
];

const AccountOperations: FC<AccountOperationsProps> = ({
  initialBalance,
  accountId,
}) => {
  const [balance, setBalance] = useState(initialBalance);
  const [amount, setAmount] = useState('');
  const [toIban, setToIban] = useState('');
  const [operation, setOperation] = useState<OperationType>('deposit');
  const router = useRouter();
  const getMessage = useMessage();

  const handleOperation = async () => {
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
    <div className={styles.accountOperation}>
      <h2 className={styles.title}>
        {getMessage('account', 'accountOperation')}
      </h2>
      <p className={styles.balance}>
        {getMessage('account', 'showBalance', { balance: balance.toFixed(2) })}
      </p>
      <div className={styles.inputGroup}>
        <RadioGroup
          name='operationType'
          options={options}
          selectedValue={operation}
          onChange={(value) => setOperation(value as OperationType)}
        />

        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={getMessage('account','amount')}
          className={styles.input}
        />
        {operation === 'transfer' && (
          <input
            type='text'
            value={toIban}
            onChange={(e) => setToIban(e.target.value)}
            placeholder={getMessage('account','toIBAN')}
            className={styles.input}
          />
        )}

        <button
          className={`${styles.button} ${styles[operation]}`}
          onClick={handleOperation}
        >
          {capitalizeFirstLetter(operation)}
        </button>
      </div>
    </div>
  );
};
export default AccountOperations;
