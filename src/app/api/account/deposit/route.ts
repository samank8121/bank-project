import { getMessage } from '@/messages';
import prisma, { TransactionType } from '@/shared/data/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {  
  const { accountId, amount } = await req.json();
  try {
    const account = await prisma.account.update({
      where: { id: accountId },
      data: {
        balance: { increment: amount },
        transactions: {
          create: {
            amount,
            type: TransactionType.DEPOSIT,
          },
        },
      },
    });

    return NextResponse.json({ success: true, balance: account.balance });
  } catch {
    const deposit = getMessage('account', 'deposit');
    return NextResponse.json(
      { success: false, error: getMessage('errors', 'failedTo', {'name': deposit}) },
      { status: 400 }
    );
  }
}
