FROM node:18.18.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . . 
EXPOSE 5000

RUN npx prisma generate
CMD [ "npm", "run", "dev" ]