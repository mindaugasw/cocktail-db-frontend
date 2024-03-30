import { getBuildVersion } from '@/Helper/EnvironmentHelper';

export type State = {
    enabled: boolean,
    categoriesOpen: {[category: string]: boolean},
    ingredients: {[ingredient: string]: boolean},
    version: string,
}

const storageKey = 'app.filters_state';
let currentState: State;

function getDefaultState(): State {
    return {
        enabled: true,
        categoriesOpen: {
            'Alkoholis': true,
            'Sirupas / likeris': true,
            'Kiti gėrimai': true,
            'Dažniausi ingridientai': true,
        },
        ingredients: {},
        version: getBuildVersion(),
    };
}

function getStoredState(): State | null {
    const stateString = localStorage.getItem(storageKey);

    if (stateString === null) {
        return null;
    }

    const stateData = JSON.parse(stateString);

    if (stateData.version === 'dev' || stateData.version === getBuildVersion()) {
        return stateData as State;
    } else {
        localStorage.removeItem(storageKey);
    }

    return null;
}

export function getState(): State {
    if (typeof currentState !== 'undefined') {
        return currentState;
    }

    let state = getStoredState();

    if (state === null) {
        state = getDefaultState();
    }

    currentState = state;

    return state;
}

export function persistState(): void {
    localStorage.setItem(storageKey, JSON.stringify(currentState));
}

export function resetState(): State {
    currentState = getDefaultState();

    return currentState;
}
