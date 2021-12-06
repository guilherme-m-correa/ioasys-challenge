<h1 align="center">
IOASYS BACKEND CHALLENGE - GUILHERME CORRÊA
</h1>

<hr>

## Functional Requirements

- Admin

[x] Should be able to create a admin user
[x] Should be able to edit a admin user
[x] Should be able to delete (logical) a admin user

- User

[x] Should be able to create a user
[x] Should be able to edit a user
[x] Should be able to delete (logical) a user

- Authentication

[x] Should be able to authenticate a user using JWT

- Movies

[x] Should be able to create a movie (only a admin user can create)
[x] Should be able to list movies
[x] Should be able to filter movies by director, name, genre or actor
[x] Should be able to show movie details and the movie average rating from all users

- Rating

[x] A user should be able to rate a movie by a score between 0 and 4

## Non-functional Requirements

- [x] Express.js
- [x] PostgresSQL
- [x] TypeORM

## Dependencies

- [Node](https://nodejs.org/en/)

## Running

1. Clone this repository<br />
2. Run `npm install` to install dependencies<br />
3. Run `cp .env.example .env` to copy .env example and setup enviroment variables for the project<br />
4. Run `cp ormconfig.example .ormconfig.jon` to copy TypeORM config file and setup the database variables<br />
5. Run `npm run build` to build<br />
6. Run `npm run migration:run` to create the database<br />
7. Run `npm run seed` to seed the database with some data (optional)<br />
8. Run `npm run start:dev` to start the server<br />

## Testing

Run `npm run test` to run the tests.

## Documentation

[Postman Collection](https://web.postman.co/workspace/IOASYS-BACKEND-TEST~96b36704-ccc4-40ec-8d7c-1afd0442f43a/collection/10405579-67c8d6e5-a214-4882-9c1d-d4ea55f22412)

Any doubts? Feel free to contact me.
