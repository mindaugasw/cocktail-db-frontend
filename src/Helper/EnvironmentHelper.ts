const devMode = import.meta.env.DEV;

export function isDevMode(): boolean {
    return devMode;
}

export function getBuildVersion(): string {
    return __BUILD_VERSION__;
}
