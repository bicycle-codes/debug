import { createDebug } from '../src/browser.js'

const debug = createDebug('fooo')

debug('debug works')

const debug2 = createDebug()

debug2('testing debug 2')

setTimeout(() => {
    debug2('log again')
}, 1000)

const debug3 = createDebug('barrr')
debug3('barrrrr')

const debug4 = createDebug('bazzz')
debug4('bazzzzzzz')  // should not log
