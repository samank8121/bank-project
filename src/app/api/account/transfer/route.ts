import { NextResponse } from 'next/server';
import prisma from '@/shared/data/prisma';
import { isValidIBAN } from '@/shared/utils/iban';

export async function POST(req: Request) {
  const { accountId: fromAccountId, toIban, amount } = await req.json();

  if (!isValidIBAN(toIban)) {
    return NextResponse.json(
      { success: false, error: 'Invalid IBAN' },
      { status: 400 }
    );
  }

  try {
    const fromAccount = await prisma.account.findUnique({
      where: { id: fromAccountId },
    });
    if (!fromAccount || fromAccount.balance < amount) {
      return NextResponse.json(
        { success: false, error: 'Insufficient funds' },
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
              type: 'transfer',
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
              type: 'transfer',
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: 'Failed to transfer' },
      { status: 400 }
    );
  }
}
