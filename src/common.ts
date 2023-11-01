/**
* Coerce `val`.
*
* @param {unknown} val
* @return {unknown}
*/
export function coerce (val:unknown):string {
    if (val instanceof Error) {
        return val.stack || val.message
    }
    return String(val)
}

/**
 * Selects a color for a debug namespace
 * @param {string} namespace The namespace string for the debug instance to be colored
 * @return {number} An ANSI color code for the given namespace
 */
export function selectColor (
    namespace:string,
    colors:string[]|number[]
):number|string {
    let hash = 0

    for (let i = 0; i < namespace.length; i++) {
        hash = ((hash << 5) - hash) + namespace.charCodeAt(i)
        hash |= 0  // Convert to 32bit integer
    }

    return colors[Math.abs(hash) % colors.length]
}
