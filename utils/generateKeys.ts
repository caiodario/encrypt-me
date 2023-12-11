const fs = require('fs');
const { randomBytes } = require('crypto');

// Gere uma chave de 32 bytes (256 bits).
const key = randomBytes(32);

// Gere um IV de 16 bytes (128 bits).
const iv = randomBytes(16);

// Converta a chave e o IV em strings hexadecimais.
const keyHex = key.toString('hex');
const ivHex = iv.toString('hex');

// Crie o conteúdo a ser adicionado ao arquivo .env.
const envContent = `
CRYPTO_KEY=${keyHex}
CRYPTO_IV=${ivHex}
`;

// Escreva o conteúdo no arquivo .env.
fs.writeFileSync('.env.local', envContent);

console.log('Chave e IV gerados e salvos no arquivo .env.local');
