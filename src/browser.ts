/**
 * Check if the given namespace is enabled.
 */
function isEnabled (namespace:string):boolean {
    // if no namespace,
    // and we are in vite DEV mode
    if (namespace === undefined) {
        if (import.meta && import.meta.env && import.meta.env.DEV) {
            return true
        }
    }

    console.log(import.meta.env.VITE_DEBUG)

    const envVar = createRegexFromEnvVar()
    return !!(envVar?.test(namespace))
}

function createRegexFromEnvVar () {
    let names = import.meta.env.VITE_DEBUG
    if (!names) return

    const split = names.split(/[\s,]+/)
    const len = split.length

    for (let i = 0; i < len; i++) {
        if (!split[i]) {
            // ignore empty strings
            continue
        }

        names = split[i].replace(/\*/g, '.*?')

        return new RegExp('^' + names + '$')
    }
}
