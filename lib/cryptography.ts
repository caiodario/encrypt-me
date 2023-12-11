import { randomBytes, scryptSync, createCipheriv, createDecipheriv } from "crypto";

const algorithm = 'aes-256-ctr';
const secret = process.env.CRIPTOGRAPHY_SECRET || 'secret';

export const encryptText = (text: string): any => {
    const { key, iv, salt } = generateKeyAndIV();
    const cipher = createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        salt: salt.toString('hex'),
        content: encrypted.toString('hex')
    }
};

const generateKeyAndIV = (saltHex?: string, ivHex?: string): any => {
    const salt = saltHex ? Buffer.from(saltHex, 'hex') : randomBytes(16);
    const iv = ivHex ? Buffer.from(ivHex, 'hex') : randomBytes(16);
    const key = scryptSync(secret, salt, 32);

    return { key, iv, salt };
};
