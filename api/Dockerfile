FROM node:18-alpine

WORKDIR /app

RUN yarn global add typescript --prefix /usr/local

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV=production

CMD yarn start:prod
