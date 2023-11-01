# debug ![tests](https://github.com/nichoth/debug/actions/workflows/nodejs.yml/badge.svg)
A tiny JavaScript debugging utility that works in Node.js and browsers. Use environment variables to control logging, so there are no ridiculous console log statements in production.

This is based on [debug](https://github.com/debug-js/debug). It's been rewritten to use contemporary JS.

**Featuring:**
* Use `exports` field in `package.json` to choose node JS or browser version
* ESM only

## Installation

```sh
$ npm i -S @nichoth/debug
```

## example

### node JS
Run your script with an env variable, `DEBUG`.

```js
// in node JS
import createDebug from '@nichoth/debug'
const debug = createDebug('fooo')
debug('testing')
```

Call this with an env var of `DEBUG=fooo`
```bash
DEBUG=fooo node ./test/fixture/node.js
```

### browser
This is ergonomic with the [vite](https://vitejs.dev/) bundler. The debug tool will look for an env variable prefixed with `VITE_`:
```sh
VITE_DEBUG=fooo
```

In your JS code:
```js
import { createDebug } from '@nichoth/debug'
const debug = createDebug('fooo')
debug('debug works')
```

Or, if you call this without any `namespace` argument, it will look at the value of `import.meta.env.DEV`. If you are in DEV mode, it will log things in a random color:

```js
const debugTwo = createDebug()
// this is only logged if `import.meta.env.DEV` is true
debugTwo('testing debug 2')
```

## develop

### browser
Start a `vite` server and log some things. This uses [the example directory](./example/).

```sh
npm start
```

### node
```sh
npm run build-tests
```

```sh
DEBUG=test node ./test/index.js
```
