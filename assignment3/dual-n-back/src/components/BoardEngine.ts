import { scoreService } from "../services/ScoreService";

export interface FlashModel {
  position: number;
  sound: number;
}

export const calculateNewScore = (
  score: number,
  level: number,
  isCorrect: boolean
): number => {
  return score + (isCorrect ? (level * 50) : (-50));
};


export const INVALID_SCORE: number = -1;
export type GameAction = { type: "startGame" } | { type: "stopGame" } | { type: "waitForNextLevel" } | { type: "startNextLevel" } | { type: "nextTurn" } | { type: "samePosition" } | { type: "sameSound" }
export const MIN_AVG = 0.8;
export const LETTERS_N_BACK = "CHKLQSRT";
export const MOVES_PER_LEVEL = 5;
export interface GameState { history: FlashModel[], waitForNextLevel: boolean, round: number, running: boolean, level: number, score: number, errors: number, hasUsedTurn: boolean }
export const INIT_GAME_STATE: GameState = { history: [], round: 0, score: -1, waitForNextLevel: false, errors: 0, hasUsedTurn: false, running: false, level: 1 };
export function gameReducer(state: GameState, action: GameAction): GameState {
    if (!state.running && !state.waitForNextLevel && action.type !== "startGame") {
        return state;
    }

    switch (action.type) {
        case "startGame":
            return {
                ...INIT_GAME_STATE,
                score: 0,
                running: true,
                waitForNextLevel: false,
                round: 0
            }
        case "waitForNextLevel":
            return {
                ...state,
                running: false,
                waitForNextLevel: true
            }
        case "stopGame":
            console.log("the game has finished");
            // Send a score to the db
            scoreService.postScore(state.score);
            return {
                ...state,
                running: false,
                waitForNextLevel: false
            }
        case "startNextLevel":
            return {
                ...state,
                history: [],
                level: state.level + 1,
                running: true,
                waitForNextLevel: false
            }
        case "nextTurn":
            // We check against MOVES_PER_LEVEL + state.level + 1 because the first "level" changes do not count towards the score. 
            // Ex: Level 1 has 2 moves
            const shouldUpdateScore = !(state.hasUsedTurn || state.history.length - 1 < state.level + 1);
            const isIncorrect: boolean = (BoardEngine.samePosition(state.level, state.history) || BoardEngine.sameSound(state.level, state.history));
            const nextStateWithScore = {
                ...state,
                history: [...state.history, BoardEngine.next(state.history)],
                ...shouldUpdateScore ?
                    (isIncorrect ?
                        { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) } :
                        { score: calculateNewScore(state.score, state.level, true) }) :
                    {},
                hasUsedTurn: false,
            };

            if (state.running && state.history.length >= MOVES_PER_LEVEL + state.level + 1) {
                const avg = (MOVES_PER_LEVEL - state.errors) / MOVES_PER_LEVEL;
                if (avg > MIN_AVG) {
                    return gameReducer(nextStateWithScore, { type: "waitForNextLevel" });
                }
                if (state.running) {
                    return gameReducer(nextStateWithScore, { type: "stopGame" });
                }
            }

            return {
                ...nextStateWithScore,
                history: [...state.history, BoardEngine.next(state.history)],
                round: state.round + 1
            }

        case "samePosition":
            return state.hasUsedTurn ? state : {
                ...state,
                ...BoardEngine.samePosition(state.level, state.history) ?
                    { score: calculateNewScore(state.score, state.level, true) } :
                    { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) },
                hasUsedTurn: true
            }
        case "sameSound":
            return state.hasUsedTurn ? state : {
                ...state,
                ...BoardEngine.sameSound(state.level, state.history) ?
                    { score: calculateNewScore(state.score, state.level, true) } :
                    { errors: state.errors + 1, score: calculateNewScore(state.score, state.level, false) },
                hasUsedTurn: true
            }
        default:
            return state;

    }
}


// Inspired by https://github.com/hindol/dual-n-back/blob/master/src/Game.tsx
export class BoardEngine {
  public static samePosition(level: number, history: FlashModel[]): boolean {
    return this.sameValue(level, history.map(h => h.position));
  }

  public static sameSound(level: number, history: FlashModel[]): boolean {
    return this.sameValue(level, history.map(h => h.sound));
  }

  private static sameValue(level: number, history: number[]) {
    if (
      history.length > level + 1 &&
      history[history.length - 1] === history[history.length - 1 - (level + 1)]
    ) {
      return true;
    } else {
      return false;
    }
  }

  public static next(history: FlashModel[]): FlashModel {
    const nextFlash: FlashModel = { position: -1, sound: -1 };
    const itemsInGrid = 3 * 3 - 1; // we subtract 1 because the center of the grid doesnt count
    const randomPos = this.randomInRange(0, itemsInGrid - 1);
    nextFlash.position = randomPos;

    const randomSound = this.randomInRange(0, itemsInGrid - 1);
    nextFlash.sound = randomSound;

    return nextFlash;
  }

  private static randomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
