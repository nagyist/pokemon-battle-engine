"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const projections_1 = require("../projections");
function switchCommand(actor, pokemonName) {
    return (battleState) => {
        if (projections_1.isFainted(battleState.pokemon[pokemonName])) {
            return battleState;
        }
        const event = events_1.pokemonSwitched(battleState.battlers[actor], pokemonName);
        return Object.assign({}, battleState, { battlers: Object.assign({}, battleState.battlers, { [actor]: pokemonName }), events: battleState.events.concat(event) });
    };
}
exports.switchCommand = switchCommand;
