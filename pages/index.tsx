import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import UploadArea from '../components/UploadArea';
import Footer from '../components/Footer';
import Messages from '../components/Messages';

type MessageInfoType = {
  show: boolean;
  text: string;
  type: 'success' | 'error';
};

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messageInfo, setMessageInfo] = useState<MessageInfoType>({ show: false, text: '', type: 'success' });

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessageInfo({ show: true, text, type });
    setTimeout(() => setMessageInfo({ show: false, text: '', type }), 3000);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleEncrypt = async () => {

    if (!selectedFile) {
      showMessage('Erro na Criptografia - Nenhum arquivo selecionado', 'error');
      return; 
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('/api/encrypt', {
          method: 'POST',
          body: formData,
          });

          if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'encrypted.txt';
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          showMessage('Sucesso na Criptografia', 'success');
      } catch (error) {
        showMessage('Erro na criptografia', 'error');
      }
    }
  };

  const handleDecrypt = async () => {
    if (!selectedFile) {
      showMessage('Erro na Descriptografia - Nenhum arquivo selecionado', 'error');
      return;
    } else {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('/api/decrypt', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decrypted.txt';
        document.body.appendChild(a);
        a.click();
  
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showMessage('Sucesso na Descriptografia', 'success');

      } catch (error) {
        showMessage('Erro na Descriptografia', 'error');
      }
    }
  };

  return (
    <div>
      <Head>
        <title>encrypt.me - criptografe seus arquivos com segurança</title>
        <meta name='description' content='Uma ferramenta segura para criptografar e descritografar arquivos.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Header />
        <main>
          <UploadArea onFileUpload={handleFileSelect} />
          <ActionButtons onEncrypt={handleEncrypt} onDecrypt={handleDecrypt} />
          <Messages info={messageInfo} /> 
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Home;