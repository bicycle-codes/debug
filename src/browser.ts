import { coerce, selectColor, createRegexFromEnvVar } from './common.js'
import humanize from 'ms'

const colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
]

const log = console.log || (() => {})

let createDebug = (namespace?:string) => (args:any) => {}

if (import.meta.env.DEV || import.meta.env.VITE_DEBUG) {
    /**
     * Create a debugger with the given `namespace`, only
     * if we are in DEV mode.
     *
     * @param {string?} namespace
     * @return {Function}
     */
    createDebug = function createDebug (namespace?:string) {
        // eslint-disable-next-line
        let prevTime = Number(new Date())
        const _namespace = namespace || generateRandomString(10)
        const color = selectColor(_namespace, colors)

        function debug (...args:string[]) {
            if (isEnabled(namespace)) {
                return logger(namespace || 'DEV', args, { prevTime, color })
            }
        }

        return debug
    }
}

export { createDebug }
export default createDebug

/**
 * Use this to create a random namespace in the case that `debug`
 * is called without any arguments.
 * @param {number} length Lenght of the random string
 * @returns {string}
 */
function generateRandomString (length = 6):string {
    return Math.random().toString(20).substring(2, length)
}

/**
 * Check if the given namespace is enabled.
 */
function isEnabled (namespace?:string):boolean {
    // if no namespace,
    // and we are in vite DEV mode
    if (namespace === undefined) {
        if (import.meta && import.meta.env && import.meta.env.DEV) {
            return true
        }
    }

    if (!import.meta.env.VITE_DEBUG) return false
    const envVar = createRegexFromEnvVar(import.meta.env.VITE_DEBUG)
    return envVar.test(namespace!)
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */
function createFormatters () {
    return {
        j: function (v) {
            try {
                return JSON.stringify(v)
            } catch (error) {
                return '[UnexpectedJSONParseError]: ' + String(error)
            }
        }
    }
}

function logger (namespace:string, args:string[], { prevTime, color }) {
    // Set `diff` timestamp
    const curr = Number(new Date())
    const diff = curr - (prevTime || curr)
    prevTime = curr

    args[0] = coerce(args[0])
    const formatters = createFormatters()

    if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O')
    }

    // Apply any `formatters` transformations
    let index = 0
    args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped %, then don't increase the
        // array index
        if (match === '%%') return '%'

        index++

        const formatter = formatters[format]
        if (typeof formatter === 'function') {
            const val = args[index]
            match = formatter.call(self, val)

            // Now we need to remove `args[index]` since it's inlined
            //   in the `format`
            args.splice(index, 1)
            index--
        }
        return match
    })

    // Apply env-specific formatting (colors, etc.)
    const _args = formatArgs({
        diff,
        color,
        useColors: shouldUseColors(),
        namespace
    }, args)

    log(..._args)
}

function shouldUseColors ():boolean {
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false
    }

    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native:
    //   https://github.com/facebook/react-native/pull/1632
    return !!((typeof document !== 'undefined' && document.documentElement &&
        document.documentElement.style &&
        document.documentElement.style.webkitAppearance) ||
        // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
        // Double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)))
}

/**
 * Colorize log arguments if enabled.
 */
function formatArgs ({ diff, color, namespace, useColors }:{
    diff:number,
    color:number,
    namespace:string,
    useColors:boolean
}, args) {
    args[0] = (useColors ? '%c' : '') +
        namespace +
        (useColors ? ' %c' : ' ') +
        args[0] +
        (useColors ? '%c ' : ' ') +
        '+' + humanize(diff)

    if (!useColors) return

    const c = 'color: ' + color
    args.splice(1, 0, c, 'color: inherit')

    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0
    let lastC = 0
    args[0].replace(/%[a-zA-Z%]/g, match => {
        if (match === '%%') {
            return
        }
        index++
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index
        }
    })

    args.splice(lastC, 0, c)

    return args
}
