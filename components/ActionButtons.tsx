import React from 'react';
interface ActionButtonsProps {
    onEncrypt: () => void;
    onDecrypt: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEncrypt, onDecrypt }) => {
    return (
        <div className='my-8 text-center'>
            <button
                className='mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={onEncrypt}>
                    Criptografar 
            </button> 
            <button
                className='mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={onDecrypt}>
                    Descriptografar
            </button>
                </div>
    );
};

export default ActionButtons;