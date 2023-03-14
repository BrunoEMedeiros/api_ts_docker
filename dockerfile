FROM node:16.13.0-slim as builder

WORKDIR /usr/src/app


COPY ./package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build

FROM node:16.13.0-alpine3.14

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install --silent --production
RUN npm cache clean --force
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node","dist/launcher.cjs"]

