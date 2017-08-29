"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const projections_1 = require("../projections");
const utils_1 = require("../utils");
function attackCommand(actor, attackerName, moveName) {
    return (battleState) => {
        const enemyActor = battleState.actors.find((enemy) => enemy !== actor);
        const defenderName = battleState.battlers[enemyActor];
        if (battleState.battlers[actor] !== attackerName) {
            return battleState;
        }
        const attacker = battleState.pokemon[attackerName];
        const defender = battleState.pokemon[defenderName];
        const move = battleState.moves[attackerName][moveName];
        if (projections_1.isFainted(attacker)) {
            return battleState;
        }
        battleState = Object.assign({}, battleState, { moves: Object.assign({}, battleState.moves, { [attackerName]: Object.assign({}, battleState.moves[attackerName], { [moveName]: Object.assign({}, battleState.moves[attackerName][moveName], { powerPoint: move.powerPoint - 1 }) }) }) });
        if (move.dex.category === 'status') {
            throw new Error(`${moveName} cannot be used yet.`);
        }
        const probability = move.dex.accuracy * (attacker.inBattleStats.accuracy / defender.inBattleStats.evasion);
        if (!utils_1.chance(probability)) {
            const event = events_1.moveMissed(moveName, attackerName, defenderName);
            return Object.assign({}, battleState, { events: battleState.events.concat(event) });
        }
        const baseDamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * move.dex.power *
            (move.dex.category === 'physical' ?
                attacker.stats.attack / defender.stats.defense :
                attacker.stats.specialAttack / defender.stats.specialDefense)) / 50) + 2;
        const delta = -(baseDamage > defender.hitPoint ? defender.hitPoint : baseDamage);
        const currentHp = defender.hitPoint + delta;
        const events = [
            events_1.moveHit(moveName, attackerName, defenderName),
            events_1.hitPointChanged(defenderName, delta)
        ];
        return Object.assign({}, battleState, { pokemon: Object.assign({}, battleState.pokemon, { [defenderName]: Object.assign({}, battleState.pokemon[defenderName], { hitPoint: currentHp }) }), events: battleState.events.concat(...events) });
    };
}
exports.attackCommand = attackCommand;
