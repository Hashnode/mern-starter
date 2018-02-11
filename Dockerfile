FROM node
MAINTAINER jaga santagostino <kandros5591@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

RUN npm run clean \
  && npm run build \
  && npm run build:server

EXPOSE 8000

ENV NODE_ENV production

CMD ["node", "index.js"]

