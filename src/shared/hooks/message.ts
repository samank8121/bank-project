'use client';
import { getMessage, MessageKey, NestedMessageKey } from '@/messages';

export function useMessage() {
  return <T extends MessageKey>(
    category: T,
    key: NestedMessageKey<T>,
    params?: Record<string, string | number>
  ) => getMessage(category, key, params);
}
