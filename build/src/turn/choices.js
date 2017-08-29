"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projections_1 = require("../projections");
function choices(battleState) {
    const switchTable = battleState.actors.reduce((table, actor) => {
        const battler = battleState.battlers[actor];
        if (projections_1.isFainted(battleState.pokemon[battler])) {
            return table.concat(actor);
        }
        return table;
    }, []);
    const forceSwitch = switchTable.length > 0;
    return battleState.actors.reduce((choices, actor) => {
        if (forceSwitch) {
            if (switchTable.includes(actor)) {
                return Object.assign({}, choices, { [actor]: ['switch'] });
            }
            return choices;
        }
        return Object.assign({}, choices, { [actor]: ['switch', 'attack'] });
    }, {});
}
exports.choices = choices;
