"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepClone(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.deepClone = deepClone;
