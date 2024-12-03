'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './create-account-form.module.scss'

export default function CreateAccountForm() {
  const [iban, setIban] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/account/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        iban,
        initialBalance: parseFloat(initialBalance),
      }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Account created successfully!');
      router.push('/');
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.accountForm}>
      <div className={styles.formGroup}>
        <label htmlFor='iban' className={styles.label}>IBAN:</label>
        <input
          type='text'
          id='iban'
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='initialBalance' className={styles.label}>Initial Balance:</label>
        <input
          type='number'
          id='initialBalance'
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          required
          min='0'
          step='0.01'
          className={styles.input}
        />
      </div>
      <button type='submit' className={styles.submitButton}>Create Account</button>
    </form>
  );
}
