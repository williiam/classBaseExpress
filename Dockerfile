FROM node

WORKDIR /usr/src/app

RUN npm install -g typescript

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001 3001

RUN npm run build

# Run node server
CMD npm start
