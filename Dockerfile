FROM node:18-alpine AS base

# 빌드 시 환경 변수로 전달받을 인자를 정의
ARG NEXT_PUBLIC_BADANORI_API_KEY
ARG NEXT_PUBLIC_KAKAO_MAP_API_KEY
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY

# 디펜던시 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# 빌드 시 전달받은 ARG 값을 런타임 ENV로 설정
ENV NEXT_PUBLIC_BADANORI_API_KEY=${NNEXT_PUBLIC_BADANORI_API_KEY}
ENV NEXT_PUBLIC_KAKAO_MAP_API_KEY=${NEXT_PUBLIC_KAKAO_MAP_API_KEY}
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=${NEXT_PUBLIC_OPENWEATHER_API_KEY}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# 아래거 서버 ip
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]