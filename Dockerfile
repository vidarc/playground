# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=production
ENV CYPRESS_INSTALL_BINARY=0

RUN apk update && apk upgrade
RUN corepack enable

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY .yarn/ .yarn/
RUN yarn install --immutable
COPY . .

EXPOSE 3000
RUN mkdir -p /home/node/app/node_modules/.vite
RUN chown -R node /home/node/app/node_modules/.vite
USER node

ENTRYPOINT [ "node", "dist/server/server.js" ]