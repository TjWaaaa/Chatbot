FROM node:19-alpine

WORKDIR /usr/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]