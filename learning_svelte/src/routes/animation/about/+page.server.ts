export function load() {
    return new Promise((fulfill) => {
        setTimeout(fulfill, 4000)
    })
}
