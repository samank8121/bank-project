import CreateAccountForm from '@/components/create-account-form';
import { Metadata } from 'next';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Create Page',
  description: 'Create Page',
};
export default function CreateAccount() {
  return (
    <main className={styles.createAccount}>
      <h1 className={styles.title}>Create New Account</h1>
      <CreateAccountForm />
    </main>
  );
}
