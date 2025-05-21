FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . . 

ARG VITE_API_URL

RUN echo "VITE_API_URL=$VITE_API_URL" > .env.production

RUN npm run build

FROM nginx:alpine

COPY mime.types /etc/nginx/mime.types

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


