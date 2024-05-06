# Atlas Functions and Triggers Examples Integration Tests

We test the code examples in this repo. The test suite we'll set up will run
automatically when people contribute new examples.

The project uses [Jest](https://jestjs.io/) to run automated tests.

## Get Started

The tests run against a backend in the Bushicorp Atlas organization named
"Atlas-Functions-Triggers-Example". The Functions and Triggers that these
tests run against are in that backend.

To add a new Function or Trigger, define it in the backend. Then, add a test
to this test suite to validate that the Function or Trigger actually works.

To ensure we're actually testing the code we show in the UI against the
Functions we have defined, use `appservices-cli` or the UI to export the 
app after adding new Functions or Triggers. Add new Functions or Triggers
to the relevant directory in this repository. Use Bluehawk to copy them
over to the directory that the BAAS backend requires.

### Install Dependencies

This project uses [npm](https://www.npmjs.com/) to manage dependencies. To get
started, run:

```bash
npm install
```

### Run Tests

**Entire test suite**

```bash
npm run test:ts
```

**Single test file**

```bash
npm test -- <fileNameWithExtension>
```

### Understand the Project Structure

The following diagram shows the key items in the project directory:

| Path              | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| `__tests__/`      | Examples, test cases, and supporting source files. Add `.ts` files here.         |
| `babel.config.js` | Configuration for [Babel](https://babeljs.io/) transpilation.                    |
| `jest.config.js`  | Configuration for the [Jest](https://jestjs.io/) testing framework.              |
| `tsconfig.json`   | Configuration for the TypeScript compiler.                                       |
| `jestSetup.js`    | Setup and cleanup for the Jest tests. Runs immediately after Jest loads.         |
