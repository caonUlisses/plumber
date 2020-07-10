FROM node:14.5.0-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install

FROM node:14.5.0-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 443
CMD [ "node", "app.js"  ]
