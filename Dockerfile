FROM node:16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:docker"]
