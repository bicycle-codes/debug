# debug
![tests](https://github.com/substrate-system/debug/actions/workflows/nodejs.yml/badge.svg)
[![module](https://img.shields.io/badge/module-ESM-blue?style=flat-square)](README.md)
[![types](https://img.shields.io/npm/types/@substrate-system/debug?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/debug)](https://packagephobia.com/result?p=@substrate-system/debug)
[![license](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square)](LICENSE)

A tiny JavaScript debugging utility that works in Node.js and browsers. Use environment variables to control logging, so there are no ridiculous console log statements in production.

This is based on [debug](https://github.com/debug-js/debug). It's been rewritten to use contemporary JS.

**Featuring:**
* Use [exports](https://github.com/substrate-system/debug/blob/main/package.json#L31) field in `package.json` to choose node JS or browser version
* ESM only

Plus, [see the docs](https://substrate-system.github.io/debug/) generated by typescript.

## Contents

<!-- toc -->

- [install](#install)
- [example](#example)
  * [browser](#browser)
  * [node JS](#node-js)
- [develop](#develop)
  * [browser](#browser-1)
  * [node](#node)

<!-- tocstop -->

## install

```sh
npm i -D @substrate-system/debug
```

Use this with [vite](https://vitejs.dev/) in the [browser](#browser) or
in [node](#node-JS).

------------------------------------------------------------------

## example

### browser
This is ergonomic with the [vite](https://vitejs.dev/) bundler. This module will look for an env variable prefixed with `VITE_`:
```sh
VITE_DEBUG=fooo
```

Given then above env variable in vite, you would log like this:
```js
import Debug from '@substrate-system/debug'
const debug = Debug('fooo')
debug('hello fooo')
```

#### DEV mode

If you initialize this without a namespace, then it checks `import.meta.env.DEV`:
```js
import Debug from '@substrate-system/debug'
const debug = Debug()
debug('debug works')   // check if `import.meta.env.DEV`
```

#### a third config option
You can pass in an env variable of `VITE_DEBUG_MODE`, and then `debug` will
check for that mode in vite.

##### For example, in the staging environment:

```sh
VITE_DEBUG_MODE=staging vite build --mode staging
```

##### use multiple modes
Can parse a comma separated list of modes.

A `.env` file like this:
```sh
VITE_DEBUG_MODE="test, staging"
```

Will log in either "test" or "staging" modes, or if `import.meta.env.DEV` is true.

```sh
vite --mode staging build
```

**If you are in production** (`import.meta.env.PROD`) and there is no `VITE_DEBUG` env var, then this exports a noop, so debug will do nothing, and your bundle will be smaller.

#### Use a namespace
In your JS code:
```js
import { createDebug } from '@substrate-system/debug'
const debug = createDebug('fooo')
debug('debug works')
```

You would start that script with a `VITE_DEBUG=fooo` env var to see the log statements.

#### Don't use a namespace
If you call this without a `namespace` argument, it will look at the value of `import.meta.env.DEV`. If you are in DEV mode, then it will log things in a random color:

```js
import { createDebug } from '@substrate-system/debug'
const debug = createDebug('fooo')
const debug2 = createDebug()

debug('debug works')
debug2('testing debug 2')
setTimeout(() => {
    debug2('log again')
}, 1000)
```

![Screenshot of `debug` in a browser](screenshot2.png)


### node JS
Run your script with an env variable, `DEBUG`.

```js
// in node JS
import createDebug from '@substrate-system/debug/node'
const debug = createDebug('fooo')
debug('testing')
```

Call this with an env var of `DEBUG=fooo`
```sh
DEBUG=fooo node ./test/fixture/node.js
```

#### NODE_ENV
If you are in dev mode (`process.env.NODE_ENV === 'development'`), then this will log things in a random color if you don't initialize it with a namespace --

```js
import createDebug from '@substrate-system/debug'
const debug = createDebug()
debug('hello')
```

Run the script like this:
```sh
NODE_ENV=development node ./my-script.js
```

##### Configure the environment value
Configure what `NODE_ENV` value will trigger logging by overriding the `shoudlLog` function:
```js
// in node only
import Debug from '@substrate-system/debug'

Debug.shouldLog = function (NODE_ENV) {
    return NODE_ENV === 'example'
}
const debug = Debug()
// this will log iff we start this like
// NODE_ENV="example" node my-program.js
debug('testing')
```

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
npm test
```
