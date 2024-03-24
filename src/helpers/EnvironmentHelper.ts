const devMode = import.meta.env.DEV;

export function isDevMode(): boolean {
    return devMode;
}
