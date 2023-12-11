# Encrypt.me - Criptografe e Descriptografe Arquivos

O Encrypt.me é uma aplicação web que permite criptografar e descriptografar arquivos com segurança. Esta aplicação foi desenvolvida usando Next.js no lado do cliente e Node.js no lado do servidor para fornecer uma maneira fácil e segura de proteger seus arquivos.

## Como Funciona

- **Criptografar Arquivos**: Faça o upload de um arquivo de texto (por exemplo, um arquivo .txt) para criptografá-lo. O arquivo criptografado será disponibilizado para download.

- **Descriptografar Arquivos**: Faça o upload de um arquivo criptografado para descriptografá-lo. O arquivo descriptografado será disponibilizado para download. (ATUALMENTE EM DESENVOLVIMENTO)

## Pré-requisitos

Certifique-se de ter Node.js e npm (ou yarn) instalados na sua máquina.

## Configuração do Projeto

1. Clone este repositório:
   ```git clone https://github.com/seu-usuario/encrypt-me.git```

2. Navegue até a pasta do projeto:
    ```cd encrypt-me```

3. Instale as dependências do projeto:
    ```npm install```

4. Inicie o servidor de desenvolvimento:
    ```npm run dev```

A aplicação estará disponível em http://localhost:3000.

##  Variáveis de Ambiente
O projeto utiliza variáveis de ambiente para configurar a criptografia. Certifique-se de criar um arquivo .env.local na raiz do projeto com as seguintes variáveis:

- CRYPTO_KEY: A chave secreta usada para criptografar e descriptografar arquivos.
- CRYPTO_IV: O vetor de inicialização usado para criptografar e descriptografar arquivos.

Você pode gerar chaves para sua utilização através da utils disponível no projeto através do comando:
   ```node utils/generateKeys.ts```

## Uso
Acesse a aplicação em http://localhost:3000.

Faça o upload de um arquivo para criptografá-lo ou descriptografá-lo.

Baixe o arquivo criptografado ou descriptografado, conforme necessário.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença
Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE.md para detalhes.

Desenvolvido por [Caio Dario](https://github.com/caiodario)

