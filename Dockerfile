FROM node:8 as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000

FROM base as development
ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN npm install
COPY .babelrc index.js nodemon.json webpack.config.babel.js webpack.config.dev.js webpack.config.prod.js webpack.config.server.js ./
COPY client ./client
COPY Intl ./Intl
COPY server ./server
CMD ["npm", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM base as production
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --production
COPY index.js ./
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "run", "start:prod"]
