import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload }) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setSelectedFileName(file.name); // Atualiza o nome do arquivo selecionado
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='border-dashed border-4 border-blue-500 roundeg-lg p-12 text-center my-8'>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className='text-gray-700'>Solte o arquivo aqui...</p>
      ) : (
        <div>
          <p className='text-gray-700'>
            {selectedFileName
              ? `Arquivo selecionado: ${selectedFileName}`
              : 'Arraste e solte o arquivo aqui, ou clique para selecionar o arquivo'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
