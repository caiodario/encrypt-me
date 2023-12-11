import React from 'react';

const Header = () => {
  return (
    <header className='flex justify-center items-center'>
        <div className='text-center'>
            <h1 className='text-6x1 font-bold text-gray-800'>encrypt.me</h1>
            <p className='text-xl text-gray-600 mt-4'>Sua ferramenta segura de criptografia e descriptografia.</p>        
        </div>
    </header>
  );
};

export default Header;