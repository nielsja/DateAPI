# Build app
FROM node:12 as builder

WORKDIR /app

COPY ["./package.json", "./package-lock.json", "/app/"]

RUN npm ci

COPY "./" "/app/"

RUN npm run build

RUN npm prune --production

# Build runtime image
## taking _only_ the parts of the now built app that we need to
## actually run the app (removing credentials, cutting the fat, etc.)
FROM node:12-alpine as runtime

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["npm", "run", "start:prod"]
