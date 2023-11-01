import { createDebug } from '../src/browser.js'

const debug = createDebug('fooo')

debug('debug works')

const debug2 = createDebug()

debug2('testing debug 2')
