FROM node:20-alpine

WORKDIR /upload

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

EXPOSE 2024

CMD ["npm", "start"]
