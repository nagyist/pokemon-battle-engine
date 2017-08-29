"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function moveHit(move, user, target) {
    return {
        type: 'move_hit',
        payload: {
            move, user, target
        }
    };
}
exports.moveHit = moveHit;
