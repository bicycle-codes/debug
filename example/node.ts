import { createDebug } from '../src/node.js'

// call this with NODE_ENV = dev

const debug = createDebug()

debug('hello')
