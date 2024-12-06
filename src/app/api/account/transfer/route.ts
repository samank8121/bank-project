import { NextResponse } from 'next/server';
import prisma, { TransactionType } from '@/shared/data/prisma';
import { isValidIBAN } from '@/shared/utils/iban';
import { getMessage } from '@/messages';

export async function POST(req: Request) {
  const { accountId: fromAccountId, toIban, amount } = await req.json();

  if (!isValidIBAN(toIban)) {
    return NextResponse.json(
      { success: false, error: getMessage('account','invalidIban') },
      { status: 400 }
    );
  }

  try {
    const fromAccount = await prisma.account.findUnique({
      where: { id: fromAccountId },
    });
    if (!fromAccount || fromAccount.balance < amount) {
      return NextResponse.json(
        { success: false, error: getMessage('account','insufficientFund') },
        { status: 400 }
      );
    }
    if (fromAccount.iban === toIban) {
      return NextResponse.json(
        { success: false, error: getMessage('account','sameAccount') },
        { status: 400 }
      );
    }    

    const [updatedFromAccount] = await prisma.$transaction([
      prisma.account.update({
        where: { iban: fromAccount.iban },
        data: {
          balance: { decrement: amount },
          transactions: {
            create: {
              amount: -amount,
              type: TransactionType.TRANSFER,
              toAccountIban: toIban,
            },
          },
        },
      }),
      prisma.account.update({
        where: { iban: toIban },
        data: {
          balance: { increment: amount },
          transactions: {
            create: {
              amount: amount,
              type: TransactionType.TRANSFER,
              toAccountIban: fromAccount.iban,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      balance: updatedFromAccount.balance,
    });
  } catch {
    const transfer = getMessage('account', 'transfer');
    return NextResponse.json(
      { success: false, error: getMessage('errors', 'failedTo', {'name': transfer}) },
      { status: 400 }
    );
  }
}
