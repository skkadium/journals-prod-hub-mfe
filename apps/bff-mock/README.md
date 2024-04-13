# bff-mock

This package contains the mock backend for frontend (BFF) that the web-app package can be developed against. This prevents UI work from being blocked by incomplete services.

----

**Table of content**

- [KickStart](#kickstart)
  - [Bootstrap](#bootstrap)
  - [Generate Mock](#generate-mock)
  - [Running Mock Server](#running-mock-server)
- [Tech Stack](#tech-stack)

## KickStart

### Bootstrap
Running `pnpm bootstrap` in the root of the repository will install dependencies and generate a `mock.json` via the `generate-mock` script. However you can do it manually.

Install dependencies.

```
pnpm install
```

### Generate Mock
You can generate mock data quickly via the generate script

```
pnpm generate-mock
```
### Running Mock Server
Start the mock server.

```
pnpm start
```

## Tech Stack
The package `msw` is used which uses the mocks.json file to stub a simple mock API. It is a simple `Express` web server under the hood and so it is very extensible and easy to add custom endpoints to.
* [Node](https://nodejs.org/) - The application runs on Node
* [Mock Service Worker](https://mswjs.io/) - API mocking library