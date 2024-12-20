export const messages = {
  account: {
    accountInfo: 'Account: {iban}',
    create: 'create account.',
    deposit: 'deposit.',
    withdraw: 'withdraw',
    transfer: 'transfer',
    invalidIban: 'Invalid IBAN',
    insufficientFund: 'Insufficient funds',
    sameAccount: 'You are sending to yourself!!',
    createNewAccount: 'Create New Account',
    createAccount: 'Create Account',
    mainPageTitle: 'Bank Accounts',
    showBalance: 'Balance: ${balance}',
    viewDetails: 'View Details',
    accountOperation: 'Account Operations',
    accountStatement: 'Account Statement',
    date:'Date',
    type:'Type',
    amount:'Amount',
    balance:'Balance',
    IBAN: 'IBAN:',
    toIBAN: 'To IBAN',
    initialBalance: 'Initial Balance:',
    positiveAmount: 'it must be positive amount',
    createSuccessfully: 'Account created successfully!'
  },
  meta:
  {
    layoutTitle:'Bank App',
    layoutDescription:'Bank App Description',
    homeTitle:'Home Page',
    homeDescription:'Home Page Description',
    accountTitle:'Account Page',
    accountDescription:'Account Page Description',
    createAccountTitle:'Create Account Page',
    createAccountDescription:'Create Account Page Description',
  },
  errors: {
    failedTo: 'Failed to {name}',
  },
} as const;

export type MessageKey = keyof typeof messages;
export type NestedMessageKey<T extends MessageKey> = keyof (typeof messages)[T];

export function getMessage<T extends MessageKey>(
  category: T,
  key: NestedMessageKey<T>,
  params?: Record<string, string | number>
): string {
  let message = messages[category][key] as string;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, String(value));
    });
  }

  return message;
}
