FROM node:14
WORKDIR /var/www/clean-node-api
COPY ./package.json .
RUN npm install --only=prod