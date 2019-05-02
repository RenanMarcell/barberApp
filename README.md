# barberApp
simple app for scheduling appointments

## Requirements

- Yarn
- Redis
- Postgres

## Installation

```sh
yarn install
```

Run postgres:
`docker run --name database -p 5432:5432 -d -t kartoza/postgis`

Create a database with the name configured in `src/config/database` (You can change it)
`npx sequelize db:create`

Run the migrations `npx sequelize db:migrate`

then start the application

`yarn start`