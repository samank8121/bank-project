import { NextResponse } from 'next/server';
import prisma from '@/shared/data/prisma';

export async function POST(req: Request) {
  const { accountId, amount } = await req.json();

  try {
    const account = await prisma.account.findUnique({ where: { id: accountId } });
    if (!account || account.balance < amount) {
      return NextResponse.json(
        { success: false, error: 'Insufficient funds' },
        { status: 400 }
      );
    }

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: {
        balance: { decrement: amount },
        transactions: {
          create: {
            amount: -amount,
            type: 'withdraw',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      balance: updatedAccount.balance,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: 'Failed to withdraw' },
      { status: 400 }
    );
  }
}
