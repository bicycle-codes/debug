import Debug from '../src/browser.js'
Debug.shouldLog = (env) => env === 'testing' || env === 'staging'

const debug = Debug('fooo')

debug('debug works')

const debug2 = Debug()

debug2('testing debug 2')

setTimeout(() => {
    debug2('log again in debug 2')
}, 1000)

const debug3 = Debug('barrr')
debug3('barrrrr')

const debug4 = Debug('bazzz')
debug4('bazzzzzzz')  // should not log

const debug5 = Debug()
debug5('debug 5 should be the same color as debug 2')

// testing the * variable
const debug7 = Debug('quxxx')
debug7('hello quxxx')

const debug8 = Debug('foo-bar')

debug8('hello eight')
