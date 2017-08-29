import * as types from './types';
export declare function createBattle(initState: types.BattleState, options?: types.BattleOptions): {
    start: (next: (battleState: types.BattleState, listener: types.Listener) => void, error: (err: Error) => void, complete: () => void) => void;
};
