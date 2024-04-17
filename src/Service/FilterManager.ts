import { getBuildVersion } from '@/Helper/EnvironmentHelper';
import { ref } from 'vue';

export type State = {
    enabled: boolean,
    categoriesOpen: {[category: string]: boolean},
    ingredients: {[ingredient: string]: boolean},
    version: string,
}

const storageKey = 'app.filters_state';

function getDefaultState(): State {
    return {
        enabled: true,
        categoriesOpen: {
            'Kitas alkoholis': false,
            'Kiti sirupai / likeriai': false,
            'Kiti ingridientai': false,
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
    }

    localStorage.removeItem(storageKey);

    return null;
}

function getState(): State {
    let state = getStoredState();

    if (state === null) {
        state = getDefaultState();
    }

    return state;
}

export function persistState(): void {
    localStorage.setItem(storageKey, JSON.stringify(filterState.value));
}

export function resetState(): void {
    filterState.value = getDefaultState();
}

export const filterState = ref<State>(getState());
