FROM node:8.9.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn
RUN yarn build:dev

ENV NODE_ENV production

EXPOSE 8000
CMD ["yarn", "start"]
