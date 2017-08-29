"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movedex = {
    tackle: {
        power: 50,
        accuracy: 100,
        priority: 0,
        basePowerPoint: 35,
        type: 'normal',
        category: 'physical'
    }
};
function getMovedexEntry(moveName) {
    if (!(moveName in movedex)) {
        throw new Error(`Unidentified move: ${moveName}`);
    }
    return movedex[moveName];
}
exports.getMovedexEntry = getMovedexEntry;
