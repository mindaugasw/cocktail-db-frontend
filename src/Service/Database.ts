import databaseJson from '@/Asset/output.prod.min.json';
import { sortByKey } from '@/Helper/ObjectHelper';

export type Ingredient = {
    text: string,
    /** A shop link for this specific instance of ingredient, for this specific recipe */
    link?: string,
    primaryAlias: string,
    /** A shop link for all instances of this ingredient, applicable for all recipes */
    primaryAliasLink?: string,
    category: string,
    nonFilterable: boolean,
}

export type Recipe = {
    name: string,
    datePublishedUnix: number,
    primaryCategorySlug: string,
    description: string | null,
    ingredients: Ingredient[],
    missingIngredients?: string[],
    steps: string[],
    image: string,
    flag: string | null,
    filterableIngredientAliases?: {[primaryAlias: string]: boolean},
    filterableIngredientCount?: number,
}

export type RecipeList = {[name: string]: Recipe};

export type FilterCategoryList = {[ingredient: string]: {
    slug: string,
    count: number,
    isFlagFilter: boolean,
}};

type FilterList = {[category: string]: FilterCategoryList};

let filters: FilterList;
let initialized = false;

function initializeData(): void {
    initializeFilters();
    initializeRecipes();

    initialized = true;
}

function initializeFilters(): void {
    const filtersData = {
        ...buildIngredientFilterList(),
        ...buildFlagFilterList(),
    };

    const filtersSorted: FilterList = {};

    for (const [categoryName, ingredients] of Object.entries(filtersData)) {
        filtersSorted[categoryName] = sortByKey(ingredients);
    }

    filters = filtersSorted;
}

function buildIngredientFilterList(): FilterList {
    const filtersData: FilterList = {};
    const missingDataIngredients = [];

    for (const [nameSlug, recipe] of Object.entries<Recipe>(databaseJson)) {
        for (const ingredient of recipe.ingredients) {
            if (ingredient.nonFilterable) {
                continue;
            }

            if (ingredient.category === undefined || ingredient.primaryAlias === undefined) {
                missingDataIngredients.push(`${ingredient.text} @ ${nameSlug}`);

                continue;
            }

            filtersData[ingredient.category] ??= {};
            filtersData[ingredient.category][ingredient.primaryAlias] ??= {
                slug: ingredient.primaryAlias.replace(' ', '_'),
                count: 0,
                isFlagFilter: false,
            }
            filtersData[ingredient.category][ingredient.primaryAlias].count++;
        }
    }

    if (missingDataIngredients.length !== 0) {
        console.warn(
            'Could not build all filters, there\'s missing category or primaryAlias for ingredients: ' +
            missingDataIngredients.join('; '),
        );
    }

    return filtersData;
}

function buildFlagFilterList(): FilterList {
    const filtersData: FilterList = {
        Kategorija: {},
    };

    for (const [, recipe] of Object.entries<Recipe>(databaseJson)) {
        if (recipe.flag) {
            filtersData.Kategorija[recipe.flag] ??= {
                slug: recipe.flag.replace(' ', '_'),
                count: 0,
                isFlagFilter: true,
            }
            filtersData.Kategorija[recipe.flag].count++;
        }
    }

    return filtersData;
}

export function getFilters(): typeof filters {
    if (!initialized) {
        initializeData();
    }

    return filters;
}

function initializeRecipes(): void {
    for (const [, recipe] of Object.entries<Recipe>(databaseJson)) {
        recipe.filterableIngredientAliases = {};

        for (const ingredient of recipe.ingredients) {
            if (ingredient.nonFilterable) {
                continue;
            }

            recipe.filterableIngredientAliases[ingredient.primaryAlias] = true;
        }

        recipe.filterableIngredientCount = Object.keys(recipe.filterableIngredientAliases).length;
    }
}

export function getRecipes(): RecipeList {
    if (!initialized) {
        initializeData();
    }

    return databaseJson;
}
