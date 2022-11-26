FROM node:19-alpine as build

WORKDIR /app
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build


FROM nginx:1.23.2-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]