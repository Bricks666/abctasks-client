FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm i --ignore-scripts
COPY . /app
ARG API_HOST
ENV VITE_API_HOST=$API_HOST
RUN npm run build
FROM nginx:1.23.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
