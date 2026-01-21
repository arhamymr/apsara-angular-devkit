# Stage 1: Builder - Build Angular demo app
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx nx run demo:build --configuration=production

# Stage 2: Production - Serve with Express
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/demo/browser /app/browser
COPY --from=builder /app/apps/demo/server.ts /app/server.ts

CMD ["node", "server.ts"]
