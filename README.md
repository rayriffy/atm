# ATM

Some genius has built an ATM, but forgot to add a way of getting money out of it!

## Demo

[GitHub Pages](https://rayriffy.github.io/atm/)

## Page structure

```
┌ /atm        Pin authentication page
└ /atm/app    Main application
```

## Packlet concept

tl;dr the way to organize code in not-too-strict way. good for fast prototyping

[More info about this architecture](https://notes.dt.in.th/PackletsSetup)

## Development

```
# Install dependencies
pnpm i

# Start development server
pnpm dev

# Build production bundle
pnpm build

# Linting
pnpm lint && pnpm format

# To run unit testing
pnpm test
pnpm test -- --coverage // with code coverage
```
