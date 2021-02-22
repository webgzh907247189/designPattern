const fs = require('fs');
const path = require('path');

const qsPackageJsonPath = path.resolve(__dirname, '../node_modules/qs/package.json');
const readFile = fs.readFileSync(qsPackageJsonPath, 'utf-8')

// "import": "./esm/index.js",
// "require": "./lib/index.js",

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

