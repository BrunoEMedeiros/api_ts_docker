FROM node:12-alpine
WORKDIR /
COPY ./package*.json ./
COPY . .
RUN npm i
EXPOSE 3000
CMD [ "npm","run","start" ]