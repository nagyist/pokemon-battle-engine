"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function moveMissed(move, user, target) {
    return {
        type: 'move_missed',
        payload: {
            move, user, target
        }
    };
}
exports.moveMissed = moveMissed;
