import React, { useState } from 'react';

const SucessMessage = () => {
    const [showSucessMessage, setShowSucessMessage] = useState(false);

    return (
        <div>
            {showSucessMessage && (
                <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>
                    <strong className='font-bold'>Sucesso!</strong>
                    <span className='block sm:inline'> Arquivo criptografado com sucesso!</span>
                    <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                        <svg className='fill-current h-6 w-6 text-green-500' role='button' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                            <title>Fechar</title>
                            <path d='M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.64 3.64a.5.5 0 0 1-.708.708L10 10.707l-3.64 3.64a.5.5 0 0 1-.708-.708L9.293 10 5.652 6.36a.5.5 0 0 1 .708-.708L10 9.293l3.64-3.64a.5.5 0 0 1 .708 0z' />
                        </svg>
                    </span>
                </div>
            )}
        </div>
    )
};

export default SucessMessage;