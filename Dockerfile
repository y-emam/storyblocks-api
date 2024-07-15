FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

ENV NODE_ENV=production

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
