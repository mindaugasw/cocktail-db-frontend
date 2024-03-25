export function sortByKey<T extends Record<string, any>>(object: T): T {
    // Source: https://stackoverflow.com/a/29622653/4110469

    return Object
        .keys(object)
        .sort()
        .reduce((result, key) => {
            (result as any)[key] = object[key];

            return result;
        }, {} as T);
}
