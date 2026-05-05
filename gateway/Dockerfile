FROM node:alpine AS base 

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM base AS dev 
EXPOSE 3000
CMD ["node", "./src/server.js"]

FROM base AS prod
EXPOSE 80
CMD ["node", "./src/server.js"]
