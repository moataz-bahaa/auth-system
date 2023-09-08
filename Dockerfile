FROM node:lts-alpine

RUN npm i -g pnpm

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 5000

CMD pnpm run start