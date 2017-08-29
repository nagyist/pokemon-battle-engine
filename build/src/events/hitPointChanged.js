"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hitPointChanged(pokemon, delta) {
    return {
        type: 'hitpoint_changed',
        payload: {
            pokemon, delta
        }
    };
}
exports.hitPointChanged = hitPointChanged;
