import React, { useState, useEffect } from 'react';

interface MessagesProps {
  info: {
    show: boolean;
    text: string;
    type: 'success' | 'error';
  };
}

const Messages: React.FC<MessagesProps> = ({ info }) => {
  const [renderText, setRenderText] = useState(info.text);

  useEffect(() => {
    if (info.show) {
      setRenderText(info.text); // Atualiza o texto imediatamente ao mostrar
    } else {
      // Aguarda a transição de opacidade antes de limpar o texto
      const timeout = setTimeout(() => setRenderText(''), 500); // O tempo deve corresponder à duração da transição
      return () => clearTimeout(timeout);
    }
  }, [info.show, info.text]);

  return (
    <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded 
                    transition-opacity duration-500 ease-in-out
                    ${info.show ? 'opacity-100' : 'opacity-0'}
                    ${info.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                    text-white`}>
      {renderText}
    </div>
  );
};

export default Messages;
