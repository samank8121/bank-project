'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create-account-form.module.scss';
import { useMessage } from '@/shared/hooks/message';
import { createAccountSchema } from '@/shared/validation/account';
import { useError } from '@/shared/hooks/error';
import InputValidation from '@/components/input-validation';
import { fetchPost } from '@/shared/utils/fetch-helper';

type FieldType = 'iban' | 'initialBalance';

export default function CreateAccountForm() {
  const [iban, setIban] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const router = useRouter();
  const getMessage = useMessage();
  const { getError, setError } = useError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validatedFields = createAccountSchema().safeParse({
      iban,
      initialBalance: parseFloat(initialBalance),
    });

    if (!validatedFields.success) {
      setError(validatedFields.error);
      return;
    }
    const response = await fetchPost({
      endpoint: '/api/account/create',
      body: JSON.stringify({
        iban,
        initialBalance: parseFloat(initialBalance),
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert(getMessage('account', 'createSuccessfully'));
      router.push('/');
    } else {
      if (data.error) {
        if (Array.isArray(data.error)) {
          setError(data.error);
        } else {
          alert(data.error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.accountForm}>
      <div className={styles.formGroup}>
        <label htmlFor='iban' className={styles.label}>
          {getMessage('account', 'IBAN')}
        </label>
        <InputValidation
           type='text'
          id='iban'
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
          error={getError<FieldType>('iban')}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='initialBalance' className={styles.label}>
          {getMessage('account', 'initialBalance')}
        </label>
        <InputValidation
          type='number'
          id='initialBalance'
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          required
          min='0.01'
          step='0.01'
          error={getError<FieldType>('initialBalance')}
        />        
      </div>
      <button type='submit' className={styles.submitButton}>
        {getMessage('account', 'createAccount')}
      </button>
    </form>
  );
}
