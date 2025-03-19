import { customAlphabet } from 'nanoid';

export function customNanoId() {
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();
}
