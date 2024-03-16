import databaseJson from '@/assets/output.prod.min.json';
import { sortByKey } from '@/helpers/ObjectHelper';

type Ingredient = {
    text: string;
    /** A shop link for this specific instance of ingredient, for this specific recipe */
    link?: string;
    primaryAlias: string;
    /** A shop link for all instances of this ingredient, applicable for all recipes */
    primaryAliasLink?: string;
    category: string;
}

type Recipe = {
    name: string;
    nameSlug: string;
    datePublishedUnix: number;
    primaryCategorySlug: string;
    description: string | null;
    ingredients: Ingredient[];
    steps: string[];
    image: string;
}

let filters: {[category: string]: {[ingredient: string]: number}};
let filtersInitialized = false;

function initializeFilters(): void {
    const filtersData: typeof filters = {};
    const missingDataIngredients = [];

    for (const [, recipe] of Object.entries<Recipe>(databaseJson)) {
        for (const ingredient of recipe.ingredients) {
            if (ingredient.category === undefined || ingredient.primaryAlias === undefined) {
                missingDataIngredients.push(`${ingredient.text} @ ${recipe.nameSlug}`);

                continue;
            }

            filtersData[ingredient.category] ??= {};
            filtersData[ingredient.category][ingredient.primaryAlias] ??= 0;
            filtersData[ingredient.category][ingredient.primaryAlias]++;
        }
    }

    if (missingDataIngredients.length !== 0) {
        console.warn(
            'Could not build all filters, there\'s missing category or primaryAlias for ingredients: ' +
            missingDataIngredients.join('; '),
        );
    }

    const filtersSorted: typeof filters = {};

    for (const [categoryName, ingredients] of Object.entries(filtersData)) {
        filtersSorted[categoryName] = sortByKey(ingredients);
    }

    filters = filtersSorted;
    filtersInitialized = true;
}

export function getFilters(): typeof filters {
    if (!filtersInitialized) {
        initializeFilters();
    }

    return filters;
}

export function getDatabaseLength(): number {
    return Object.keys(databaseJson).length;
}
