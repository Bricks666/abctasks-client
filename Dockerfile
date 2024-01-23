FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json /app/
RUN npm ci --ignore-scripts

COPY . /app/

RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY ./deploy/nginx/ /etc/nginx/

EXPOSE 80 443

ENV SERVER_NAME="localhost"

ENV API_PROXY_PASS=""
ENV DOCS_PROXY_PASS=""

CMD [ "nginx", "-g", "daemon off;" ]
