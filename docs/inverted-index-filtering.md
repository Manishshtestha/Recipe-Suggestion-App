# Algorithm Documentation: Inverted Index Filtering

## 1. Purpose

The Inverted Index is a high-performance algorithm used to make filtering by selected ingredients on the main recipe page nearly instantaneous. Its purpose is to avoid slow, repetitive searching through the entire list of recipes every time a user adds or removes an ingredient.

It is a core data structure used by modern search engines to achieve fast query results.

## 2. How It Works

Instead of iterating through every recipe, we pre-process the data to create an optimized data structure.

1.  **Index Creation:** The algorithm creates an "index" (a JavaScript `Map`) that maps each unique ingredient to a list of all the recipes that contain it. For example:
    ```json
    {
      "chicken": [recipe1, recipe5, recipe8],
      "tomato":  [recipe2, recipe3, recipe8]
    }
    ```
    This index is created only once and is then reused, thanks to React's `useMemo` hook, which caches the result.

2.  **Instant Lookup:** When a user selects ingredients, the algorithm performs a very fast lookup in this index to get the lists of matching recipes.

3.  **Union of Results:** It then efficiently combines these lists to get the final, filtered set of unique recipes to display to the user. This is dramatically faster than a direct, brute-force search.

## 3. Location in Codebase

-   **Client-Side Implementation:** The Inverted Index is built and used in the `src/app/(root)/page.tsx` component to power the `filteredSuggestedRecipes` logic. 