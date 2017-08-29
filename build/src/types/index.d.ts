export interface BattleOptions {
    decisionTimeout?: number;
}
export declare type Dispatcher = (battleDecision: BattleDecision, emitError?: (errorMessage: string) => void) => void;
export declare type DecisionProvider = (choices: BattleChoices, dispatch: Dispatcher) => void;
export declare type Listener = (sub: DecisionProvider) => () => void;
export interface BattleController {
    listen: Listener;
    emit(choices: BattleChoices, dispatch: Dispatcher): void;
}
export declare type Type = 'normal' | 'fire' | 'fighting' | 'water' | 'flying' | 'grass' | 'poison' | 'electric' | 'ground' | 'psychic' | 'rock' | 'ice' | 'bug' | 'dragon' | 'ghost' | 'dark' | 'steel' | 'fairy';
export declare type Stats = {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
};
export interface Pokemon {
    name: string;
    species: string;
    level: number;
    gender: 'male' | 'female' | 'unknown';
    evs: Stats;
    ivs: Stats;
    moves: string[];
}
export interface Actor {
    name: string;
    partyMembers: Pokemon[];
}
export interface PokedexEntry {
    types: Type[];
    baseStats: Stats;
}
export interface MovedexEntry {
    power: number;
    accuracy: number;
    priority: number;
    basePowerPoint: number;
    type: Type;
    category: 'physical' | 'special' | 'status';
}
export interface BattlingPokemon extends Pokemon {
    dex: PokedexEntry;
    stats: {
        attack: number;
        defense: number;
        specialAttack: number;
        specialDefense: number;
        speed: number;
    };
    inBattleStats: {
        evasion: number;
        accuracy: number;
    };
    maxHitPoint: number;
    hitPoint: number;
}
export interface Move {
    dex: MovedexEntry;
    powerPoint: number;
    isDisabled: boolean;
}
export interface BattleEvent {
    type: string;
    payload: {};
}
export interface BattleState {
    actors: string[];
    pokemon: {
        [name: string]: BattlingPokemon;
    };
    parties: {
        [actor: string]: string[];
    };
    battlers: {
        [actor: string]: string;
    };
    moves: {
        [pokemon: string]: {
            [move: string]: Move;
        };
    };
    events: BattleEvent[];
}
export interface BattleChoices {
    [actor: string]: ('attack' | 'switch')[];
}
export interface AttackDecision {
    decision: 'attack';
    actor: string;
    move: string;
}
export interface SwitchDecision {
    decision: 'switch';
    actor: string;
    pokemon: string;
}
export declare type BattleDecision = AttackDecision | SwitchDecision;
export interface DecisionResponse {
    battleDecision: BattleDecision;
    emitError: ((errorMessage: string) => void) | undefined;
}
export declare type BattleCommand = (battleState: BattleState) => BattleState;
export interface TurnCommand {
    command: BattleCommand;
    priorities: number[];
}
