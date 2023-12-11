import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadAreaProps {
    onFileUpload: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps>= ({ onFileUpload }) => {
    const onDrop  = useCallback((acceptedFiles: File[]) => {
        // Algo
        if (acceptedFiles[0]) onFileUpload(acceptedFiles[0]);
}, [onFileUpload]);

const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

return (
    <div {...getRootProps()} className='border-dashed border-4 border-blue-500 roundeg-lg p-12 text-center my-8'>
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p className='text-gray-700'>Solte o arquivo aqui...</p> :
            <p className='text-gray-700'>Arraste e solte o arquivo aqui, ou clique para selecionar o arquivo</p>
        }
    </div>
);
};

export default UploadArea;