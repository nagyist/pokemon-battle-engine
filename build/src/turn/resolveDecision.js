"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
const projections_1 = require("../projections");
const decisionError_1 = require("./decisionError");
function resolveDecision(battleState, battleDecision) {
    if (battleDecision.decision === 'attack') {
        const attackerName = battleState.battlers[battleDecision.actor];
        const attacker = battleState.pokemon[attackerName];
        if (projections_1.isFainted(attacker)) {
            throw new decisionError_1.DecisionError('Cannot attack with a fainted pokémon.');
        }
        if (!(battleDecision.move in battleState.moves[attackerName])) {
            throw new decisionError_1.DecisionError('This pokémon does not have this move.');
        }
        const move = battleState.moves[attackerName][battleDecision.move];
        if (move.isDisabled) {
            throw new decisionError_1.DecisionError('Cannot use this move: is disabled.');
        }
        if (move.powerPoint <= 0) {
            throw new decisionError_1.DecisionError('Cannot use this move: is out of power point.');
        }
        return {
            command: commands_1.attackCommand(battleDecision.actor, attackerName, battleDecision.move),
            priorities: [8, move.dex.priority, projections_1.decisionSpeed(attacker)]
        };
    }
    if (battleDecision.decision === 'switch') {
        if (!battleState.parties[battleDecision.actor].includes(battleDecision.pokemon)) {
            throw new decisionError_1.DecisionError('This pokémon is not in your party.');
        }
        if (battleState.battlers[battleDecision.actor] === battleDecision.pokemon) {
            throw new decisionError_1.DecisionError('This pokémon is already battling.');
        }
        if (projections_1.isFainted(battleState.pokemon[battleDecision.pokemon])) {
            throw new decisionError_1.DecisionError('Cannot switch to a fainted pokémon.');
        }
        return {
            command: commands_1.switchCommand(battleDecision.actor, battleDecision.pokemon),
            priorities: [64]
        };
    }
    throw new decisionError_1.DecisionError('Invalid decision.');
}
exports.resolveDecision = resolveDecision;
