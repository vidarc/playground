# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=production
ENV CYPRESS_INSTALL_BINARY=0

RUN apk update && apk upgrade && apk add \
  curl \
  && rm -rf /var/cache/apk/*
RUN corepack enable

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY .yarn/ .yarn/
RUN yarn install --immutable && yarn cache clean --all
COPY ["tsconfig.json", "tsconfig.server.json", "vite.config.js", "./"]
COPY src src
RUN yarn build

EXPOSE 3000
RUN mkdir -p /home/node/app/node_modules/.vite
RUN chown -R node /home/node/app/node_modules/.vite
USER node

HEALTHCHECK --timeout=3s \
  CMD curl -f http://localhost:3000/api/health || exit 1

ENTRYPOINT [ "node", "dist/server/server.js" ]