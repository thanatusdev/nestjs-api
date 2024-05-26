# syntax=docker/dockerfile:1

FROM node:18.17.1-alpine AS base
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /var/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
ENV NODE_ENV production
WORKDIR /var/app
COPY --from=dependencies /var/app/node_modules node_modules/
COPY . .
RUN npx prisma generate
RUN pnpm build
RUN pnpm prune --prod --config.ignore-scripts=true

FROM base AS deploy

ARG DATABASE_URL
ARG APP_ENV

### Adding secrets to docker
ENV DATABASE_URL ${DATABASE_URL}
ENV APP_ENV ${APP_ENV}

ENV NODE_ENV production

WORKDIR /var/app
USER node

# Do not remove the next two lines, if you do, an EACCES (permission denied) error will occur
COPY --chown=node:node --from=build /var/app/node_modules node_modules/
COPY --chown=node:node --from=build /var/app/dist dist/
COPY --chown=node:node --from=build /var/app/prisma prisma/
# :)

EXPOSE 8080

CMD ["node", "dist/main.js"]

# Command to build the image
# docker build -t <image-name> --build-arg DATABASE_URL=<database-url> --build-arg APP_ENV=<app-env> .