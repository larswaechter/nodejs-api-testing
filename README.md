# nodejs-api-testing

[![CI/CD](https://github.com/larswaechter/nodejs-api-testing/actions/workflows/actions.yml/badge.svg)](https://github.com/larswaechter/nodejs-api-testing/actions/workflows/actions.yml)

This repository is an example app on testing Node.js REST-APIs with Jest, Supertest & Chai that depend on an external database. Where cover two different testing strategies here. On the one hand we run the tests against a test database. On the other hand we run the tests without any database using a mocked data layer.

You can find a detailed explanation about the application's testing strategy and architecture on my [blog](https://larswaechter.dev/blog/nodejs-api-testing/).

## Technology

- Language: [typescript](https://www.npmjs.com/package/typescript)
- Server: [express](https://www.npmjs.com/package/express)
- Database: [postgres](https://www.npmjs.com/package/pg)
- Testing: [jest](https://www.npmjs.com/package/jest) & [supertest](https://www.npmjs.com/package/supertest) & [chai](https://www.npmjs.com/package/chai)
- CI/CD: GitHub Actions
- Containerization: Docker

## Setup

### Docker

Enter the following command to run the docker images:

```bash
docker-compose up
```

The app is available at [http://localhost:3001](http://localhost:3001).

### Native

Enter the following commands to start the app:

```bash
npm i

mv example.env .env	# Enter credentials here

npm run watch
```

The app is available at [http://localhost:3000](http://localhost:3000).

> Tip: When running the app natively you can still use the Postgres instance from Docker.

## Testing

You can run the tests using a database or not. Errors that occur during the tests are logged to the following file `/logs/tests.log`

### Database

Make sure to have a Postgres instance running before executing the tests.

```bash
npm run test:db
```

### Mock

In this case the database layer is mocked.

```bash
npm run test:mock
```
