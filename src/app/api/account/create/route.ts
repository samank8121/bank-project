import { getMessage } from '@/messages';
import prisma, { TransactionType } from '@/shared/data/prisma';
import { parseError } from '@/shared/utils/parse-error';
import { createAccountSchema } from '@/shared/validation/account';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { iban, initialBalance } = await req.json();
  const validatedFields = createAccountSchema().safeParse({
    iban,
    initialBalance,      
  });

  if (!validatedFields.success) {
    const errorMsg = parseError(validatedFields.error);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 400 }
    );
  }
  try {
    const account = await prisma.account.create({
      data: {
        iban,
        balance: initialBalance,
        transactions: {
          create: {
            amount: initialBalance,
            type: TransactionType.DEPOSIT,
          },
        },
      },
    });

    return NextResponse.json({ success: true, account });
  } catch {
    const create = getMessage('account', 'create');
    return NextResponse.json(
      { success: false, error: getMessage('errors', 'failedTo', {'name': create}) },
      { status: 400 }
    );
  }
}
