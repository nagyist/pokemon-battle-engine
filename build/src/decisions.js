"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAttackDecision(actor, move) {
    return { decision: 'attack', actor, move };
}
exports.createAttackDecision = createAttackDecision;
function createSwitchDecision(actor, pokemon) {
    return { decision: 'switch', actor, pokemon };
}
exports.createSwitchDecision = createSwitchDecision;
