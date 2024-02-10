import { createDebug } from '../src/browser.js'

const debug = createDebug('fooo')

debug('debug works')

const debug2 = createDebug()

debug2('testing debug 2')

setTimeout(() => {
    debug2('log again in debug 2')
}, 1000)

const debug3 = createDebug('barrr')
debug3('barrrrr')

const debug4 = createDebug('bazzz')
debug4('bazzzzzzz')  // should not log

const debug5 = createDebug()
debug5('debug 5 should be the same color as debug 2')

const debug6 = createDebug()
debug6('testing the mode var')  // <-- should log (a test of the MODE variable)
