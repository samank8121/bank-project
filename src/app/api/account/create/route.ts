import { getMessage } from '@/messages';
import prisma from '@/shared/data/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { iban, initialBalance } = await req.json();

  try {
    const account = await prisma.account.create({
      data: {
        iban,
        balance: initialBalance,
        transactions: {
          create: {
            amount: initialBalance,
            type: 'deposit',
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
