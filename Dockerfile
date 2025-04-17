FROM node:18-alpine AS base

# 빌드 인자 정의
ARG NEXT_PUBLIC_BADANORI_API_KEY
ARG NEXT_PUBLIC_KAKAO_MAP_API_KEY
ARG NEXT_PUBLIC_OPENWEATHER_API_KEY
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_KAKAO_REST_API_KEY

# 의존성 설치 단계
FROM base AS deps
WORKDIR /app

# 패키지 관리 파일만 복사
COPY package.json package-lock.json* ./

# 의존성 설치 최적화 - 빌드에 필요한 것만 설치
RUN npm ci --also=production --force

# 빌드 단계
FROM base AS builder
WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules

# 소스 코드 복사
COPY . .

# 환경 변수 설정
ENV NEXT_PUBLIC_BADANORI_API_KEY=${NEXT_PUBLIC_BADANORI_API_KEY}
ENV NEXT_PUBLIC_KAKAO_MAP_API_KEY=${NEXT_PUBLIC_KAKAO_MAP_API_KEY}
ENV NEXT_PUBLIC_KAKAO_REST_API_KEY=${NEXT_PUBLIC_KAKAO_REST_API_KEY}
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=${NEXT_PUBLIC_OPENWEATHER_API_KEY}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 빌드 최적화 - 더 적은 메모리 사용
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 빌드 실행
RUN npm run build

# 실행 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BADANORI_API_KEY=${NEXT_PUBLIC_BADANORI_API_KEY}
ENV NEXT_PUBLIC_KAKAO_MAP_API_KEY=${NEXT_PUBLIC_KAKAO_MAP_API_KEY}
ENV NEXT_PUBLIC_KAKAO_REST_API_KEY=${NEXT_PUBLIC_KAKAO_REST_API_KEY}
ENV NEXT_PUBLIC_OPENWEATHER_API_KEY=${NEXT_PUBLIC_OPENWEATHER_API_KEY}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# 시스템 계정 생성 (보안 강화)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 필요한 파일만 복사 (최소화)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
