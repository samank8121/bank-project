/** @jest-environment node */
import { POST } from './route';
import { NextResponse } from 'next/server';
import prisma from '@/shared/data/prisma';

jest.mock('@/shared/data/prisma', () => ({
  account: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
}));
jest.mock('@/messages');

describe('POST route handler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should successfully deposit funds', async () => {
    const req = {
      json: jest.fn().mockResolvedValue({ accountId: '1', amount: 100 }),
    } as unknown as Request;
    (prisma.account.update as jest.Mock).mockResolvedValue({ balance: 150 });
    const response = await POST(req);
    expect(response).toBeInstanceOf(NextResponse);
    expect(await response.json()).toEqual({
      success: true,
      balance: 150,
    });
  });
});
