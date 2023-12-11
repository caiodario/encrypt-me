import { createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-ctr';

export const encryptText = (text: string, key: Buffer, iv: Buffer): string => {
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
  return encrypted.toString('hex');
};

export const decryptText = (encryptedData: string, key: Buffer, iv: Buffer): string => {
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);
  return decrypted.toString('utf-8');
};
