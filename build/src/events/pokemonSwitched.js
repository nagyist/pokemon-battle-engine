"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pokemonSwitched(from, to) {
    return {
        type: 'pokemon_switched',
        payload: {
            from, to
        }
    };
}
exports.pokemonSwitched = pokemonSwitched;
