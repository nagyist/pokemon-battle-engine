"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chance(probability, total = 100) {
    const ratio = probability / total;
    return Math.random() < ratio;
}
exports.chance = chance;
