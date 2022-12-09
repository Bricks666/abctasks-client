FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm i --omit=dev --ignore-scripts --force && npm i -D typescript --force
COPY . /app
RUN npm run build
FROM nginx:1.23.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
