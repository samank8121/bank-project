/** @jest-environment node */
import { POST } from './route';
import { NextResponse } from 'next/server';
import prisma from '@/shared/data/prisma';
import { isValidIBAN } from '@/shared/utils/iban';
import { getMessage } from '@/messages';

jest.mock('@/shared/data/prisma', () => ({
    account: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  }));
jest.mock('@/shared/utils/iban');
jest.mock('@/messages');

describe('POST route handler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 400 if IBAN is invalid', async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ accountId: '1', toIban: 'invalid', amount: 100 }),
    } as unknown as Request;

    (isValidIBAN as jest.Mock).mockReturnValue(false);
    (getMessage as jest.Mock).mockReturnValue('Invalid IBAN');

    const response = await POST(req);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Invalid IBAN',
    });
  });

  it('should return 400 if insufficient funds', async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ accountId: '1', toIban: 'valid', amount: 100 }),
    } as unknown as Request;

    (isValidIBAN as jest.Mock).mockReturnValue(true);
    (prisma.account.findUnique as jest.Mock).mockResolvedValue({ balance: 50 });
    (getMessage as jest.Mock).mockReturnValue('Insufficient funds');

    const response = await POST(req);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Insufficient funds',
    });
  });

  it('should return 400 if same account', async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ accountId: '1', toIban: 'same', amount: 100 }),
    } as unknown as Request;

    (isValidIBAN as jest.Mock).mockReturnValue(true);
    (prisma.account.findUnique as jest.Mock).mockResolvedValue({
      balance: 200,
      iban: 'same',
    });
    (getMessage as jest.Mock).mockReturnValue(
      'Cannot transfer to the same account'
    );

    const response = await POST(req);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Cannot transfer to the same account',
    });
  });

  it('should successfully transfer funds', async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ accountId: '1', toIban: 'valid', amount: 100 }),
    } as unknown as Request;

    (isValidIBAN as jest.Mock).mockReturnValue(true);
    (prisma.account.findUnique as jest.Mock).mockResolvedValue({
      balance: 200,
      iban: 'from',
    });
    (prisma.$transaction as jest.Mock).mockResolvedValue([{ balance: 100 }]);

    const response = await POST(req);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true, balance: 100 });
  });

  it('should handle errors during transfer', async () => {
    const req = {
      json: jest
        .fn()
        .mockResolvedValue({ accountId: '1', toIban: 'valid', amount: 100 }),
    } as unknown as Request;

    (isValidIBAN as jest.Mock).mockReturnValue(true);
    (prisma.account.findUnique as jest.Mock).mockResolvedValue({
      balance: 200,
      iban: 'from',
    });
    (prisma.$transaction as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );
    (getMessage as jest.Mock).mockReturnValue('Failed to transfer');

    const response = await POST(req);

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Failed to transfer',
    });
  });
});
