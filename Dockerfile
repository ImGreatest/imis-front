# Stage 1: Build Angular App
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

