# Stage 1: Build Angular App
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
