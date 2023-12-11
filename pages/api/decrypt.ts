import type { NextApiRequest, NextApiResponse } from 'next';
import { decryptText } from '../../lib/cryptography';
import { IncomingForm, Files, File } from 'formidable';
import { readFileSync, writeFileSync, createReadStream } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método não suportado' });
        return;
    }

    const form = new IncomingForm();

    form.parse(req, (err, fields, files: Files) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao processar o arquivo' });
            return;
        }

        const uploadedFile = files.file as File | File[];
        const singleFile = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

        if (!singleFile) {
            res.status(400).json({ error: 'Nenhum arquivo enviado' });
            return;
        }

        try {
            const filePath = singleFile.filepath;
            const encryptedDataString = readFileSync(filePath, 'utf-8');

            const decryptedContent = decryptText(JSON.parse(encryptedDataString));

            const tempFilePath = join(tmpdir(), 'decrypted.txt');
            writeFileSync(tempFilePath, decryptedContent, 'utf-8');

            res.setHeader('Content-Disposition', 'attachment; filename=decrypted.txt');
            res.setHeader('Content-Type', 'text/plain');

            const readStream = createReadStream(tempFilePath);
            readStream.pipe(res);

        } catch (error) {
            res.status(500).json({ error: 'Erro ao descriptografar o arquivo' });
        }
    });
}
