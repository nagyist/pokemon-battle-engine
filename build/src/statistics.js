"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function statistics({ level, ivs, evs }, { baseStats }) {
    const stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
    stats['hp'] = Math.floor(Math.floor(2 * baseStats.hp + ivs.hp + Math.floor(evs.hp / 4) + 100) * level / 100 + 10);
    ['atk', 'def', 'spa', 'spd', 'spe'].forEach((statName) => {
        stats[statName] = Math.floor(Math.floor(2 * baseStats[statName] + ivs[statName] + Math.floor(evs[statName] / 4)) * level / 100 + 5);
    });
    return stats;
}
exports.statistics = statistics;
