import CreateAccountForm from '@/components/create-account-form';
import { Metadata } from 'next';
import styles from './page.module.scss';
import { getMessage } from '@/messages';

export const metadata: Metadata = {
  title: getMessage('meta', 'createAccountTitle'),
  description: getMessage('meta', 'createAccountDescription'),
};
export default function CreateAccount() {
  return (
    <main className={styles.createAccount}>
      <h1 className={styles.title}>{getMessage('account', 'createNewAccount')}</h1>
      <CreateAccountForm />
    </main>
  );
}
