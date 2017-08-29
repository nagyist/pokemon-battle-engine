"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const choices_1 = require("./choices");
const compareCommands_1 = require("./compareCommands");
const decisionError_1 = require("./decisionError");
const resolveDecision_1 = require("./resolveDecision");
function* turn(battleState) {
    const commandQueue = [];
    const pendingChoices = choices_1.choices(battleState);
    while (Object.keys(pendingChoices).length !== 0) {
        const { battleDecision, emitError } = yield pendingChoices;
        try {
            if (!(battleDecision.actor in pendingChoices)) {
                throw new decisionError_1.DecisionError('This actor cannot make decisions now.');
            }
            if (!pendingChoices[battleDecision.actor].includes(battleDecision.decision)) {
                throw new decisionError_1.DecisionError('This actor is not allowed to make this decision.');
            }
            commandQueue.push(resolveDecision_1.resolveDecision(battleState, battleDecision));
            delete pendingChoices[battleDecision.actor];
        }
        catch (error) {
            if (error instanceof decisionError_1.DecisionError && typeof emitError === 'function') {
                emitError(error.message);
            }
        }
    }
    const battleCommands = commandQueue.sort(compareCommands_1.compareCommands).map((command) => command.command);
    return battleCommands.reduce((currentState, battleCommand) => {
        return battleCommand(currentState);
    }, battleState);
}
exports.turn = turn;
