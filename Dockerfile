FROM node:24-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable
WORKDIR /app

FROM base AS build

COPY . .
RUN pnpm install --frozen-lockfile
RUN NODE_ENV=production pnpm run build

FROM base AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/artifacts/api-server/dist ./artifacts/api-server/dist
COPY --from=build /app/artifacts/school-website/dist/public ./artifacts/school-website/dist/public

EXPOSE 3005

CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
