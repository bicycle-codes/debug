# debug
A tiny JavaScript debugging utility modelled after Node.js core's debugging
technique. Works in Node.js and web browsers.

This is based on [debug](https://github.com/debug-js/debug). It's been rewritten to use contemporary JS.

**Featuring:**
* Use `exports` field in `package.json` to choose node JS or browser version
* ESM only

## Installation

```bash
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
```js
import createDebug from '@nichoth/debug'
const debug = createDebug('fooo')
```
