const devMode = import.meta.env.DEV;

export function isDevMode(): boolean {
    return devMode;
}

export function getBuildVersion(): string {
    return __BUILD_VERSION__;
}

// Build-time constants cannot be accessed directly in vue templates, so reassign it to a normal variable
export const appBasePath = __BASE_PATH__;
