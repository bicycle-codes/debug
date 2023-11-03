# debug
[![module](https://img.shields.io/badge/module-ESM-blue)](README.md)
[![types](https://img.shields.io/npm/types/msgpackr)](README.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

A tiny JavaScript debugging utility that works in Node.js and browsers. Use environment variables to control logging, so there are no ridiculous console log statements in production.

This is based on [debug](https://github.com/debug-js/debug). It's been rewritten to use contemporary JS.

**Featuring:**
* Use [exports](https://github.com/nichoth/debug/blob/main/package.json#L31) field in `package.json` to choose node JS or browser version
* ESM only

## Installation

```sh
npm i -D @nichoth/debug
```

------------------------------------------------------------------

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

#### NODE_ENV
If you are in dev mode (`process.env.NODE_ENV === 'DEV`), then this will log things in a random color if you don't call it with a namespace or pass in a `DEBUG` env var.

```js
import createDebug from '@nichoth/debug'
const debug = createDebug()
debug('hello')
```

Run the script like this:
```sh
NODE_ENV=DEV node ./my-script.js
```

------------------------------------------------------

### browser
This is ergonomic with the [vite](https://vitejs.dev/) bundler. This module will look for an env variable prefixed with `VITE_`:
```sh
VITE_DEBUG=fooo
```

**If you are in production** (`import.meta.env.PROD`) and there is no `VITE_DEBUG` env var, then this exports a noop, so debug will do nothing, and your bundle will be smaller.

#### Use a namespace
In your JS code:
```js
import { createDebug } from '@nichoth/debug'
const debug = createDebug('fooo')
debug('debug works')
```

You would start that script with a `VITE_DEBUG=fooo` env var to see the log statements.

#### Don't use a namespace
If you call this without a `namespace` argument, it will look at the value of `import.meta.env.DEV`. If you are in DEV mode, then it will log things in a random color:

```js
const debugTwo = createDebug()
// this is only logged if `import.meta.env.DEV` is true
debugTwo('testing debug 2')

setTimeout(() => {
    debug2('log again')
}, 1000)
```

![Screenshot of `debug` in a browser](screenshot2.png)

-------------------------------------------------------------------

## develop

### browser
Start a `vite` server and log some things. This uses [the example directory](./example/).

```sh
npm start
```

### node
Run tests:

```sh
npm run build-tests
```

```sh
DEBUG=test node ./test/index.js
```

