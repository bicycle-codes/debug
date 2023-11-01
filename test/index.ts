import { test } from '@nichoth/tapzero'
import createDebug from '../src/node.js'

let debug
test('createDebug', async t => {
    debug = createDebug('test')
    debug('trying things')
    t.ok(true, "logged something and didn't throw")
})

test('log some more', async t => {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            debug('log some more things')
            t.ok(true, 'did not throw')
            resolve()
        }, 1000)
    })
})
