FROM node
WORKDIR app

COPY client/package.json client/
RUN cd client && npm install
COPY client/. client/
RUN cd client && npm run build

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]