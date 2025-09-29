# Build
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Production
FROM node:22-slim

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/build ./build

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3333

CMD [ "node", "build/infra/http/server.js" ]