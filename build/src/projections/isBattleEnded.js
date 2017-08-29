"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isFainted_1 = require("./isFainted");
function isBattleEnded(battleState) {
    return battleState.actors.find((actor) => {
        return battleState.parties[actor].find((pokemonName) => {
            return !isFainted_1.isFainted(battleState.pokemon[pokemonName]);
        }) === undefined;
    }) !== undefined;
}
exports.isBattleEnded = isBattleEnded;
