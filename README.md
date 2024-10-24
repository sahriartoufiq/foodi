## Buying Frenzy

## Description

Buying Frenzy, a backend service and a database for a food delivery platform

## Setup project in local machine

Local Machine Requirement :

- Docker
- Node > 14.16.1
- yarn > 1.22.10

```bash
# run docker postgres
$ docker run -it --name postgres -d -e POSTGRES_PASSWORD="password" -p 5431:5432 -v /var/lib/postgresql/data:/var/lib/postgresql/data postgres

# after completing postgres, go to the project repository
$ go to root project directory

# install required library
$ yarn

# setup db related things
$ yarn db:setup

# start backend
$ yarn start

```

## Access API Docs ( Swagger )

```bash
# in web browser:
$ http://localhost:3000/documentation

```

## Note

This Backend heavily use [hapi.js](https://hapi.dev/)
[sequelize](https://sequelize.org/)
