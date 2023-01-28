FROM node:19-slim

WORKDIR /usr/app
COPY ./package.json ./yarn.lock ./
COPY ./prisma ./prisma/
RUN yarn install --frozen-lockfile
COPY . .
RUN npx prisma generate
RUN yarn build
CMD [ "yarn", "start" ]