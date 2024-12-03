## Getting Started
1. create .env file with this key:
    - DATABASE_URL=... //here is the connection string of your postgressql which docker user that
2. yarn install
3. docker-compose up -d //for creating database 
4. Apply Schema Changes to Database: 
    - yarn prisma generate
    - yarn prisma db push  

## Run Application  
yarn dev

## Run Test
yarn test

## Project OverView
This project is a fullstack sample bank application built with Next.js 15. It demonstrates accounts also it has create account, transfer, desposit and withdraw from account.

## Technologies
- next.js
- typescript
- prisma as ORM
- jest for test
- sass for styling