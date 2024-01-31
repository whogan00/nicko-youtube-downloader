FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build
RUN pnpm prune --production


FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build"]