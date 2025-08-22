# --- Etapa de build ---
FROM node:20 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# --- Etapa final (solo servidor + build) ---
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario
COPY --from=build /app/build ./build
COPY server.js ./
COPY package.json yarn.lock ./

# Instalar solo dependencias necesarias para el server
RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["node", "server.js"]
