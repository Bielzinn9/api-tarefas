
# Imagem oficial do Node.js
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --omit=dev

# Copiar código da aplicação
COPY src ./src

# Porta da API
EXPOSE 3000

# Iniciar servidor
CMD ["npm", "start"]
