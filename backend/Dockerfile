FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x ./wait-for-mysql.sh

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
