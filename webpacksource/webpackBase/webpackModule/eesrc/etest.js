let defaultA = {name: '--name--'}
export default defaultA

export let age = '--age--'

export function fn(str) {
    age = str
    defaultA = str
}