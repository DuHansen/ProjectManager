FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home

WORKDIR /home/node/app

COPY package.json ./
COPY src/ ./src

USER node

RUN npm install

COPY --chown=node:node . . 

EXPOSE 3333

CMD ["start"]