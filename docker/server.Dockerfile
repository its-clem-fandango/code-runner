FROM node:20-alpine AS base
 
FROM base AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune server --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# Build the project
COPY --from=pruner /app/out/full/ .
RUN yarn turbo run build --filter=server...
 
FROM base
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs --ingroup nodejs
USER nestjs
 
COPY --from=builder /app/apps/server/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nestjs:nodejs /app/apps/server/dist ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

EXPOSE 8080
 
CMD node main.js

