# FROM node:14-alpine as builder

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# COPY package.json ./

# RUN npm i -g @nestjs/cli
# RUN npm install

# COPY . .

# RUN npm run build
# RUN npm prune --production

# FROM node:14-alpine

# RUN apk --no-cache add curl
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# ENV LISTEN_PORT=80
# EXPOSE $LISTEN_PORT

# COPY --from=builder /usr/src/app/.env* ./
# COPY --from=builder /usr/src/app/dist ./dist
# COPY --from=builder /usr/src/app/node_modules ./node_modules

# CMD [ "node", "dist/main" ]

FROM node:12.14.0-alpine3.11

RUN apk add --no-cache bash git

RUN touch /home/node/.bashrc | echo "PS1='\w\$ '" >> /home/node/.bashrc

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm i -g @nestjs/cli@7.4.1

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node
WORKDIR /home/node/app