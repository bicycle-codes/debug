import { test } from '@nichoth/tapzero'
import createDebug from '../src/node.js'

test('createDebug', async t => {
    const debug = createDebug('test')
    debug('trying things')
    t.ok(true, "logged something and didn't throw")
})
