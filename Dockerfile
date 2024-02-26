# Stage 1: Build Angular App
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Stage 2: Serve Angular App using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/imis-front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]