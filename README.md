# SETUP PROJECT

Create .env file

```
DATABASE_URL="mysql://yourID:yourpassword@localhost:3306/yourdb"
```

```shell

npm install

npx prisma migrate dev --name init

npx prisma generate

npm run build

npm run start
```
