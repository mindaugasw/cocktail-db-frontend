import databaseJson from '@/Asset/output.prod.min.json';
import { sortByKey } from '@/Helper/ObjectHelper';

type Ingredient = {
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
    missingIngredients?: Ingredient[],
    steps: string[],
    image: string,
    flag: string | null,
}

export type RecipeList = {[name: string]: Recipe};

type FilterList = {[category: string]: {
    [ingredient: string]: {
        slug: string,
        count: number,
        isFlagFilter: boolean,
    },
}};

let filters: FilterList;
let filtersInitialized = false;

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
    filtersInitialized = true;
}

function buildIngredientFilterList(): FilterList {
    const filtersData: FilterList = {};
    const missingDataIngredients = [];

    for (const [nameSlug, recipe] of Object.entries<Recipe>(databaseJson)) {
        for (const ingredient of recipe.ingredients) {
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
    if (!filtersInitialized) {
        initializeFilters();
    }

    return filters;
}

export function getRecipes(): RecipeList {
    return databaseJson;
}
