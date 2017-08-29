"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dex_1 = require("./dex");
const statistics_1 = require("./statistics");
const utils_1 = require("./utils");
const createBattlingPokemon = (partyMember) => {
    const pokedexEntry = dex_1.getPokedexEntry(partyMember.species);
    const stats = statistics_1.statistics(partyMember, pokedexEntry);
    return Object.assign({}, utils_1.deepClone(partyMember), {
        dex: utils_1.deepClone(pokedexEntry),
        stats: {
            attack: stats.atk,
            defense: stats.def,
            specialAttack: stats.spa,
            specialDefense: stats.spd,
            speed: stats.spe
        },
        inBattleStats: {
            evasion: 100,
            accuracy: 100
        },
        maxHitPoint: stats.hp,
        hitPoint: stats.hp
    });
};
const createMove = (moveName) => {
    const movedexEntry = dex_1.getMovedexEntry(moveName);
    return Object.assign({}, {
        dex: utils_1.deepClone(movedexEntry),
        powerPoint: movedexEntry.basePowerPoint,
        isDisabled: false
    });
};
function createState(...actors) {
    if (actors.length !== 2) {
        throw new Error('Only two actors are allowed in battle.');
    }
    if (new Set(actors.map((actor) => actor.name)).size !== actors.length) {
        throw new Error('Actors cannot share the same name.');
    }
    if (actors.filter((actor) => actor.partyMembers.length !== 0).length !== actors.length) {
        throw new Error('Actors must have at least a pokémon in their party.');
    }
    const everyPokemon = actors.map((actor) => actor.partyMembers)
        .reduce((p1, p2) => p1.concat(p2), []);
    return {
        actors: actors.map((actor) => actor.name),
        pokemon: everyPokemon.reduce((pokemon, partyMember) => (Object.assign({}, pokemon, { [partyMember.name]: createBattlingPokemon(partyMember) })), {}),
        parties: actors.reduce((parties, actor) => (Object.assign({}, parties, { [actor.name]: actor.partyMembers.map((partyMember) => partyMember.name) })), {}),
        battlers: actors.reduce((battlers, actor) => (Object.assign({}, battlers, { [actor.name]: actor.partyMembers[0].name })), {}),
        moves: everyPokemon.reduce((pokemon, partyMember) => (Object.assign({}, pokemon, { [partyMember.name]: partyMember.moves.reduce((moves, moveName) => (Object.assign({}, moves, { [moveName]: createMove(moveName) })), {}) })), {}),
        events: []
    };
}
exports.createState = createState;
