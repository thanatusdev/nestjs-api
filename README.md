# Build an API with NodeJS and Typescript

## Technologies

- NestJS with Fastify
- TypeScript
- Docker
- Docker-compose
- Prisma
- Class-Transformer and Class-Validator
- Jest and supertest
- Swagger
- Github Actions

## Requirements

Please follow the guidelines below while working on this test:

- Implement your solution using TypeScript, and feel free to use any packages or frameworks of
  your choice.
- Utilise a SQL-based database, preferably PostgreSQL, for data storage. You can consider using
  Prisma as an ORM (Object-Relational Mapping) tool.
- You can choose between building RESTful API endpoints or using AWS Lambda for serverless
  endpoints.
- Consider organising your code with relevant design patterns suitable for CRUD (Create, Read,
  Update, Delete) applications.
- Aim to future-proof your codebase by writing clean, maintainable, and extensible code.
- Keep the SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) in mind while designing your solution.

## How to run the run the project?

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## What next?

- Integrate Sentry for monitoring errors.
- Observability with Prometheus and Grafana.
- Create a pipeline to use Dependabot.
- Create a pipeline to deploy it on AWS or GCP.

## Concepts

- REST API principals
  - CRUD
  - HTTP methods
- Request validation
- API documentation with Swagger
- Unit tests and e2e tests
