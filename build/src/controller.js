"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createController() {
    const subscribers = [];
    function listen(sub) {
        subscribers.push(sub);
        return () => {
            const index = subscribers.indexOf(sub);
            if (index >= 0) {
                subscribers.splice(index, 1);
            }
        };
    }
    function emit(choices, dispatch) {
        subscribers.forEach((sub) => {
            sub(choices, dispatch);
        });
    }
    return {
        listen,
        emit
    };
}
exports.createController = createController;
