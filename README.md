# barberApp
simple app for scheduling appointments

Para rodar o app:
`docker run --name database -p 5432:5432 -d -t kartoza/postgis`

Crie uma database com o nome configurado no `src/config/database` (você pode altera-lo)

Faça as migrations `npx sequelize db:migrate`