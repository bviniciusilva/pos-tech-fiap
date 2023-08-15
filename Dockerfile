# Use uma imagem base do Node.js
#FROM node:14

# Defina o diretório de trabalho dentro do container
#WORKDIR /app

# Copie o arquivo package.json e o package-lock.json (se existir)
#COPY package*.json ./

# Instale as dependências do Node.js
#RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
#COPY . .

# Exponha uma porta (opcional, caso seu aplicativo escute em uma porta específica)
#EXPOSE 3000

# Comando para iniciar o aplicativo quando o container for executado
#CMD ["npm", "start", ";", "npm", "run", "start:dev"]
#CMD ["npm", "run", "start:dev"]

#ENTRYPOINT [ "npm run dev" ]

FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]