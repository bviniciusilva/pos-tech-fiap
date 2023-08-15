# TECH CHALLENGE - POST TECH FIAP

Este projeto utiliza a arquitetura hexagonal e é escrito em TypeScript.

## Docker
Para iniciar o projeto utilizando a configuração deixada no Dockerfile
Já com o Docker instalado na máquina, abra um terminal e insira o seguinte comando:
```
docker-compose
docker-compose -f .\docker-compose.yaml up
```


## Instalação sem Docker
### Pré-requisitos

- Node.js (versão X.X.X)
- NPM (versão X.X.X)

### Instalação

1. Clone este repositório em sua máquina:

   ```shell
   git clone https://github.com/andre-luiz1997/tech-challenge-post-tech-fiap.git
    cd tech-challenge-post-tech-fiap
    npm install
   ```

### Scripts Disponíveis

- test: Executa os testes unitários utilizando Jest.
- start: Inicia o repositório em memória utilizando o arquivo src/index.ts.
- dev: Inicia um servidor Express na porta configurada no arquivo .env, utilizando o arquivo src/infra/drivers/server.ts.

Certifique-se de ter as dependências instaladas antes de executar os scripts.

#### Uso

Para executar o projeto, utilize um dos seguintes comandos:

Para iniciar o repositório em memória:

```shell
Copy code
npm start
```

Para iniciar o servidor Express:

```shell
Copy code
npm run dev
```

### Swagger
- Abrir o navegador em [localhost](http://localhost/)

