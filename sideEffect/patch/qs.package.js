const fs = require('fs');
const path = require('path');

const qsPackageJsonPath = path.resolve(__dirname, '../node_modules/qs/package.json');
const readFile = fs.readFileSync(qsPackageJsonPath, 'utf-8')

// "import": "./esm/index.js",
// "require": "./lib/index.js",


// https://es6.ruanyifeng.com/#docs/module-loader
// 注意，如果同时还有其他别名，就不能采用简写，否则或报错。(类似下面的混合写法，暂时不支持)

const josn = {...JSON.parse(readFile), "exports": {
    // ".": "./esm/index.js",
    // "default": "./lib/index.js",
    // "node": {
    //     "import": "./esm/index.js",
    //     "require": "./lib/index.js"
    // },
    
    // "./feature": {
    //     "node": "./lib/index.js",
    //     "default": "./esm/index.js"
    // },
    // ".": "./esm/index.js",

    "import": "./esm/index.js",
    "require": "./lib/index.js",
    
    // "./package": "./package.json",
    // "./package.json": "./package.json",

    // "./esm/index": "./esm/index.js",
    // "./esm/formats": "./esm/formats.js",
    // "./esm/parse": "./esm/parse.js",
    // "./esm/stringify": "./esm/stringify.js",
    // "./esm/utils": "./esm/utils.js",

    // "./lib/index": "./lib/index.js",
    // "./lib/formats": "./lib/formats.js",
    // "./lib/parse": "./lib/parse.js",
    // "./lib/stringify": "./lib/stringify.js",
    // "./lib/utils": "./lib/utils.js",
} }

fs.writeFileSync(qsPackageJsonPath, JSON.stringify(josn))

