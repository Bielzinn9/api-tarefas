
# Utiliza uma imagem oficial do Node.js
FROM node:22-alpine

# Define a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala somente as dependências necessárias
RUN npm ci --omit=dev

# Copia o código da aplicação
COPY src ./src

# Informa a porta utilizada pela API
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
