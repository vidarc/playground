FROM node:16-alpine

ENV NODE_ENV=production
ENV CYPRESS_INSTALL_BINARY=0

RUN apk update && apk upgrade
RUN corepack enable

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./
COPY .yarn/ ./.yarn
COPY .yarnrc.yml ./
RUN yarn --immutable
COPY src ./src
COPY tsconfig* ./
COPY vite.config.js ./
RUN yarn build

EXPOSE 3000
RUN chown -R node /home/node/app/node_modules
USER node

ENTRYPOINT [ "node", "dist/server/server.js" ]