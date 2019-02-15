"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function getString(arr) {
    Reflect.apply(JSON.stringify, null, arr);
    return JSON.stringify(arr);
}
getString([{ name: 'sadsad' }]);
