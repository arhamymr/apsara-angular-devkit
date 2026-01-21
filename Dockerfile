FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm add -g serve

COPY --from=builder /app/dist/apps/demo/browser /app/dist

EXPOSE 8080

CMD ["serve", "-s", "/app/dist", "-l", "8080"]
