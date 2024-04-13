# PPE Micro-Frontend(MFE) React Web Template
Template project for setting up a **React** + **Vite** + **TypeScript** pnpm monorepo

----

**Table of content**
- [Features](#features)
  - [Authentication](#authentication)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
- [Packages vs apps](#packages-vs-apps)
- [KickStart](#kickstart)
  - [Leyden Integration](#leyden-integration)
  - [Bootstrap](#bootstrap)
  - [Running Test](#running-tests)
  - [Linting](#linting)
  - [Build](#build)
  - [Building the docker image](#building-the-docker-image)
  - [Running the docker container locally](#running-the-docker-image-locally)
- [Vite Module Federation](#vite-module-federation)
  - [Set up the remote configuration](#set-up-the-remote-configuration)
  - [Set up the host configuration](#set-up-the-host-configuration)
- [Running on Apple silicon](#running-on-apple-silicon)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

### Authentication

* This repository does not include any built-in authentication code.
* It is expected to inherit or remotely use the authentication mechanism from the host application, specifically ppe-web-journals-production-hub, leveraging [Vite's Module Federation Runtime sharing](#set-up-the-host-configuration).
> ***Note***: This feature is currently in the exploration stage. This README will be updated with more details, findings, and configuration steps.

## Setup
Clone this repository into a new folder and reset git to disassociate it from the templates repository.

```
git clone git@gitlab.et-scm.com:PPE/ppe-create-mfe-template.git ppe-my-app
cd ppe-my-app
rm -rf .git
git init
```

Locate and replace the string (without the quotes) '${webapp-name}' with the lowercase and hyphenated name of the web application, for example, journals-production-hub.

Rename the directory within the project root folder from `helm/ppe-create-mfe-template` to `helm/${webapp-name}`.

Update the title element in the `web-app` package's template located at `/index.html`.

Modify the title of this README and update the initial description to reflect information about your app.

### Prerequisites

This repo is a monorepo powered by [pnpm](https://pnpm.io/), a faster alternative to yarn that efficiently manages dependencies between workspaces. 

All applications are located in the `apps` folder, and libraries are in the `packages` folder. 
Pnpm workspaces automatically handle dependencies between these workspaces behind the scenes.

You'll need to install the following on your machine:
* [Node](https://nodejs.org/en/download) (LTS v18 version)
* [pnpm](https://pnpm.io/installation#using-npm)
* [Docker](https://www.docker.com/)

Run the app locally by following the [**KickStart**](#kickstart) section in this README.

In the `web-app` package, you'll find an example component located at `src/components/person`. This component showcases fetching person details from the `bff-mock` package (Rest API for time being). Additionally, there are unit tests demonstrating how to test these interactions. After understanding the setup, feel free to remove these examples.

Now the project is ready to be pushed to your project's Git repository.

```
git add -A
git commit -m "Initial commit"
git remote add origin git@gitlab.et-scm.com:PPE/ppe-my-app.git
git push origin master
```

Now code your app!

## Packages vs apps

This repo contains two types of workspaces:

- `packages`: meant to be published to npm and installed,
    - `config` - holds application configurations.
    - `logger` - offers logging capabilities.
- `apps`: meant to be executed.
    - `bff-mock`- A mock implementation of the Backend for Frontend (BFF) service for the web application.
    - `web-app` - The micro frontend application.

## KickStart
> ***Note***: Run the following commands in the project's root directory

### Leyden Integration
Steps needed to access the Layden Health Design System and use its React components.

#### Creating an `.npmrc` file
To begin utilizing the Layden Health Design System, you need to create an `.npmrc` file. This file will allow you to access and use the Layden artifacts. Follow the steps below to create this file:

Navigate to the home directory `(~)` and run the following commands
- Replace <Artifactory_username> with the science ID
- Generate a new or use an existing Artifactory API and replace <artifactory_api_key>.
```
curl -u <Artifactory_username>:<artifactory_api_key> https://rt.artifactory.tio.systems/artifactory/api/npm/npm-health-leyden-virtual/auth/els > .npmrc
```




### Bootstrap

Install dependencies for all packages and generate any necessary mock files.
```
pnpm bootstrap
```
Launch the application in Dev mode; this command will initiate the bff-mock to handle BFF requests.
```
pnpm start:web-app:mock
```

### Running Tests
Run unit and pact tests in all packages. The web-app package's tests are ran first in isolation so that it can generate it's pacts. These are used by the bff-mock package to verify it's API.
```
pnpm test
```

### Linting
All code in this repository is linted using:

* [ESLint](https://eslint.org/) - Lints JavaScript/Typescript
* [StyleLint](https://stylelint.io/) - Lints CSS & SCSS

Lint all JavaScript/Typescript and SCSS in all packages.
```
pnpm lint
```

## Build
Compile the `web-app` package within the apps workspace, and copy all necessary files (excluding `node_modules`) for the Docker image to `/dist`. Also, include dependent libraries from the packages workspace.
```
pnpm build
```

## Building the docker image
Build a local docker image of this app. The docker build requires `pnpm build` be run first to ensure files it depends on are created.
```
docker build -t <name>:<version> .
```

### Running the docker container locally
To run the a container of the build image you will need to inject any environment variables required by the web-server package.

```
docker run -d -p 4000:4000 <name>:<version>
```
To confirm the application's successful operation within the Docker container, access http://localhost:4000/health. It should return `{"status": "UP"}`.

## Vite Module Federation
A Vite plugin which supports Module Federation feature.
* Module federation allows for sharing code between distinct projects, enabling them to dynamically import and utilize each other's code at runtime. 
* This fosters code reuse and supports the development of micro-frontends and intricate multi-app architectures.

Install the Vite Module Federation plugin in the project by executing the following command in the `web-apps` folder
```
pnpm add -D @originjs/vite-plugin-federation
```

## Set up the remote configuration
Modify `vite.config.ts`
```
import federation from "@originjs/vite-plugin-federation";
export default {
    plugins: [
    react(),
    svgr(),
    federation({
      name: remote-app,
      filename: 'remoteEntry.js',
      remotes: {},
      // Modules to expose
      exposes: {
        './Button': './src/components/Button.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ]
}
```

## Set up the host configuration
Modify `vite.config.ts`
```
import federation from "@originjs/vite-plugin-federation";
export default {
    plugins: [
    react(),
    svgr(),
    federation({
      name: host-app,
      filename: 'remoteEntry.js',
      exposes: {
        './secure': './src/store/secureStore.ts'
      }
      remotes: {
        remote_app: "http://localhost:5001/remoteEntry.js"
      },
      shared: ['react', 'react-dom', 'zustand']
    })
  ]
}
```

### Running on Apple silicon

Lower versions of node are only compiled for x86 and updating to a node version compiled for arm64 *might* lead to compatibility issues.
Mac have introduced a "translation" layer between cpu architectures called Rosetta.

```zsh
softwareupdate --install-rosetta --agree-to-license
```

The [settings.json](/.vscode/settings.json) contains a Rosetta terminal profile that can be used from within vscode to launch a Rosetta terminal.
Launching the terminal is as simple as `cmd + shift + p` > `Create new terminal with profile` and then picking Rosetta. This configuration assumes
you're using `zsh` as your shell. The configuration is easily modifiable if you use prefer any shell.









