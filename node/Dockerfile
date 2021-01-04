FROM node:10-alpine

RUN mkdir -p /home/opc/node/node_modules && chown -R node:node /home/opc/node

WORKDIR /home/opc/node

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]