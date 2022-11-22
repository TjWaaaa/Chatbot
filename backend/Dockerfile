FROM node:19-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build