# Employee management app

## Install

### Manual
- Set mongodb connection url in /config/index.js file
- Build the frontend
```shell
## from the root folder
cd client
npm install
npm run build
```

- Run the app
```shell
## from the root folder
npm install
node server.js
```
- open the browser on ```http://localhost:8080```

### With docker compose
- Run the following commands
```shell
## from the root folder run
docker-compose up
```
- open the browser on ```http://localhost:8080```