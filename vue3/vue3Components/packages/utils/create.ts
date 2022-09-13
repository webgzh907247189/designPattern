// bem  block-element-modifier

const _bem = <T extends string>(prefixName: string, blockSuffix: T, element: T, modifier: T): string => {
    if(blockSuffix){
        prefixName += `-${blockSuffix}`
    }
    if(element){
        prefixName += `__${element}`
    }
    if(modifier){
        prefixName += `--${modifier}`
    }
    return prefixName
}

const creteBEM = (prefixName: string) => {

    const b = (blockSuffix = '', ) => _bem<string>(prefixName, blockSuffix, '', '')
    const e = (element = '', ) => element ? _bem<string>(prefixName, '', element, '') : ''
    const m = (modifier = '', ) => modifier ? _bem<string>(prefixName, '', '', modifier) : ''

    const be = (blockSuffix = '', element = '') => blockSuffix && element ? _bem<string>(prefixName, blockSuffix, element, '') : ''
    const bm = (blockSuffix = '', modifier = '') => blockSuffix && modifier ? _bem<string>(prefixName, blockSuffix, '', modifier) : ''
    const em = (element = '', modifier = '') => element && modifier ? _bem<string>(prefixName, '', element, modifier) : ''
    const bem = (blockSuffix = '', element = '', modifier = '') => blockSuffix && element && modifier ? _bem<string>(prefixName, blockSuffix, element, modifier) : ''
    const is = (name: string, state: boolean) => state ? `is-${name}` : ''
    return {
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    }
}

export const createNameSpace = (name: string) => {
    const prefixName = `test-${name}`
    return creteBEM(prefixName)
}

// const bem = createNameSpace('icon')
// console.log(bem.b('box'), '11')
// console.log(bem.e('element'), '22')
// console.log(bem.m('modifier'), '33')
// console.log(bem.bem('box','element', 'modifier'), '44')
// console.log(bem.is('checked', true), '55')