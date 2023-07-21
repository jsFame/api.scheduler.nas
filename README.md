# api.scheduler.nas

[![E2E](https://github.com/jsFame/api.scheduler.nas/actions/workflows/e2e.yaml/badge.svg)](https://github.com/jsFame/api.scheduler.nas/actions/workflows/e2e.yaml)
[![Technical Documentation](https://github.com/jsFame/api.scheduler.nas/actions/workflows/gitpages.yaml/badge.svg)](https://github.com/jsFame/api.scheduler.nas/actions/workflows/gitpages.yaml)
[![Docker Builds](https://github.com/jsFame/api.scheduler.nas/actions/workflows/docker.yaml/badge.svg)](https://github.com/jsFame/api.scheduler.nas/actions/workflows/docker.yaml)
[![Cross-Node18,19,20](https://github.com/jsFame/api.scheduler.nas/actions/workflows/cross.yaml/badge.svg)](https://github.com/jsFame/api.scheduler.nas/actions/workflows/cross.yaml)

# Inspiration

During my college years, I found that teachers, students & myself would often have to
stand outside the dean's office for long hours. I found this very disturbing as a Computer
Science Engineering Student. I saw the potential of a software scheduler that would make
everyone's life easy.

From the technical side, my main source of motivation was the simplicity and elegance of https://www.when2meet.com

## Description

Scheduler RESTFul API Server built using NestJS, Prisma, REST and PostgreSQL.

Built with ❤️on top of

- [x] Typescript
- [x] [NestJS](https://github.com/nestjs/nest)
- [x] [Prisma](https://www.prisma.io)
- [x] [Passport.js](https://docs.nestjs.com/recipes/passport)
- [x] [Rest](https://en.wikipedia.org/wiki/Representational_state_transfer)
- [x] [PostgreSQL](https://www.postgresql.org)

## About Scheduler.nas

### Functional specs

Task management allows users to register, create tasks and manage them, major features are

- User [Host&Guest] SignUp & SignIn
- Create Events for every day
- Create timeslots with availability status for events applicable for everyday
- Schedule meetings/sessions based on available timeslots provided by the host


### Technical methodologies followed

- Modular architecture: Tasks & Auth handled in separate modules, separating concerns.
- HTTP requests are handled by Controllers
- <s> API documentation using nest/swagger module </s>
- Business logic is implemented in Services
- Database interactions are handled  using Prisma
- Validation using NestJS Pipes
- Data Transfer Object(DTO) pattern for transferring data between layers
- Configuration management using .env files for development, test & prod configs
- Authentication / Authorization, Task ownership by users
- PassportJS, JWT tokens, Password hashing, salts
- Unit tests using Jest
- Supertest for E2E testing

### Technical documentation using [Compodoc](https://jsfame.github.io/api.scheduler.nas/)

As NestJS is heavily inspired by Angular, we can generate the documentation about project
structure modules, controllers, services etc. I have generated the docs.

Find 'em here - https://jsfame.github.io/api.scheduler.nas/

## Installation

```
npm install -g pnpm
pnpm install
```

## Running the app

### Prerequisite for running the app in any mode - dev/test/prod

- Copy `.env.example` with `.env`
- Fill in the env vars in `.env`

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

This repo is [MIT licensed](LICENSE).
