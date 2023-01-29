FROM node:19-slim

RUN apt-get update && apt-get install -y openssl
WORKDIR /usr/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN yarn build
CMD [ "yarn", "start" ]