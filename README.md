# CodeRacer

CodeRacer is a javascript based coding challenge platform designed to help users improve their problem solving skills under pressure. When you create or join a game or "race", a coding challenge is randomly selected based on the difficulty chosen. You will see both your editor and your opponents editor (which you can disable with the eye icon). The first person to solve and submit the correct result wins the race! 

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org/) app
- `server`: [Nest.js](https://docs.nestjs.com/) app
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev

```

### Installation

When running locally make sure to comment out the @WebSocketGateway for app.coderacer.xyz in battles.gateway and editors.gateway

### Environment Variables

#### Frontend:
- `NEXT_PUBLIC_GITHUB_CLIENT_ID`
- `NEXT_PUBLIC_REDIRECT_URI`
- `NEXT_PUBLIC_SERVER_URL`

#### Backend:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `MONGO_URL`
- `NEXT_PUBLIC_CLIENT_URL`
- `NEXT_PUBLIC_REDIRECT_URI`
- `COOKIE_SECURE=false`
- `COOKIE_DOMAIN=localhost`

### Prerequisites

This project uses Yarn as a package manager

```
 npm install --global yarn
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
