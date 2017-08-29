"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const controller_1 = require("./controller");
const projections_1 = require("./projections");
const turn_1 = require("./turn");
const utils_1 = require("./utils");
function battleFactory(options = {}) {
    const { decisionTimeout = 5 * 60 * 1000 } = options;
    function run(battleState, onTurn) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const controller = controller_1.createController();
            onTurn(battleState, controller.listen);
            if (projections_1.isBattleEnded(battleState)) {
                return;
            }
            const decisionProvider = (choices, resolve) => {
                const dispatcher = (battleDecision, emitError) => {
                    resolve({ battleDecision, emitError });
                };
                controller.emit(choices, dispatcher);
            };
            battleState = yield nextTick(turn_1.turn(battleState), decisionProvider);
            return run(battleState, onTurn);
        });
    }
    function nextTick(turn, decisionProvider, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tick = turn.next(response);
            if (tick.done) {
                return tick.value;
            }
            response = yield utils_1.timeout(new Promise((resolve) => {
                return decisionProvider(tick.value, resolve);
            }), decisionTimeout, new Error('A timeout was reached while waiting for decision.'));
            return nextTick(turn, decisionProvider, response);
        });
    }
    return {
        run
    };
}
function createBattle(initState, options = {}) {
    const battle = battleFactory(options);
    const observable = (observer) => {
        battle.run(initState, observer.next)
            .then(observer.complete)
            .catch(observer.error);
    };
    return {
        start: (next, error, complete) => {
            return observable({
                next,
                error,
                complete
            });
        }
    };
}
exports.createBattle = createBattle;
