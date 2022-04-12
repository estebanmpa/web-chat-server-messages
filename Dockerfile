FROM node:lts-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV development

FROM node:lts-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm audit fix; exit 0
COPY . .
RUN npm run build --prod
ENV NODE_ENV production
EXPOSE 9001