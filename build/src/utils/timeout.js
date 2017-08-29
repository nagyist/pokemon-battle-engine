"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeout(promise, timeout, error) {
    let timer;
    return Promise.race([
        promise,
        new Promise((_, reject) => timer = setTimeout(reject, timeout, error))
    ]).then((response) => {
        if (timer !== undefined) {
            clearTimeout(timer);
        }
        return response;
    });
}
exports.timeout = timeout;
