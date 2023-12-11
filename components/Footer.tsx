import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-100 text-center p-4 mt-8 flex items-center justify-center">
        <a href="https://github.com/caiodario" target="_blank" rel="noopener noreferrer">
          <img src="/githubicon.svg" alt="GitHub" className="inline-block h-6 w-6 mr-2" />
        </a>
        <p className="text-sm text-gray-600">Criado por Caio Dario</p>
      </footer>
    );
  };
  
  export default Footer;