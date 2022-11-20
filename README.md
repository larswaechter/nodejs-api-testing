# nodejs-api-testing

[![CI/CD](https://github.com/larswaechter/nodejs-api-testing/actions/workflows/actions.yml/badge.svg)](https://github.com/larswaechter/nodejs-api-testing/actions/workflows/actions.yml)

This repository is an example app on testing Node.js REST-APIs with Jest, Supertest & Chai.

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

### Native

Enter the following commands to start the app:

```bash
npm i

mv example.env .env	# Enter credentials here

npm run watch
```

## Testing

...
