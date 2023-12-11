import type { NextApiRequest, NextApiResponse } from 'next';
import { decryptText } from '../../lib/cryptography';
import { IncomingForm, Fields, File, Files } from 'formidable';
import { createReadStream, writeFileSync, readFileSync, unlink } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export const config = {
  api: {
    bodyParser: false,
  },
};

const fixedKey = Buffer.from(process.env.CRYPTO_KEY || '', 'hex');
const fixedIV = Buffer.from(process.env.CRYPTO_IV || '', 'hex');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err: Error, fields: Fields, files: Files) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao processar o arquivo' });
      }

      const uploadedFile = files.file as File | File[];

      const singleFile = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

      if (!singleFile) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      try {
        const filePath = singleFile.filepath;
        const fileContent = readFileSync(filePath, 'utf-8');
        const decryptedData = decryptText(fileContent, fixedKey, fixedIV);

        const tempFilePath = join(tmpdir(), 'decrypted.txt');
        writeFileSync(tempFilePath, decryptedData, 'utf-8');
        console.log('Arquivo temporário criado em: ', tempFilePath)
        res.setHeader('Content-Disposition', 'attachment; filename=decrypted.txt');
        res.setHeader('Content-Type', 'text/plain');

        const readStream = createReadStream(tempFilePath);
        readStream.pipe(res);

        unlink(tempFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Erro ao excluir o arquivo temporário:', unlinkErr);
          }
        });
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao descriptografar o arquivo' });
      }
    });
  } else {
    res.status(405).json({ error: 'Método não suportado' });
  }
}
