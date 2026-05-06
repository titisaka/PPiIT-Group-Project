FROM node:alpine AS base 

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ENV SERVER_PORT=3000 
FROM base AS dev
EXPOSE 3000
CMD ["node", "./src/server.js"]

FROM base AS prod
ENV SERVER_PORT=80
EXPOSE 80
CMD ["node", "./src/server.js"]
