# Algorithm Documentation: Fuzzy Search

## 1. Purpose

The Fuzzy Search algorithm provides a more forgiving and user-friendly search experience. It allows users to find what they're looking for even if they make typos, use partial words, or have minor misspellings in their search query.

This significantly improves usability over a traditional, literal string search.

## 2. How It Works

We use the popular `Fuse.js` library to implement fuzzy matching on the client side.

1.  **Initialization:** A `Fuse` instance is created and provided with the dataset to be searched (e.g., the list of all recipes or all ingredients). We configure it with the keys to search against (`name`, `ingredients`) and a `threshold` value.

2.  **Search and Scoring:** When a user types a query, `Fuse.js` calculates a "distance" score for each item in the dataset, measuring how close it is to the query. It returns a list of items that are below the specified `threshold`, sorted by relevance.

3.  **Threshold:** The `threshold` (set to `0.4` in our implementation) controls how "fuzzy" the search is. A value of `0.0` would only allow perfect matches, while a value of `1.0` would match anything. `0.4` provides a good balance between flexibility and relevance.

## 3. Location in Codebase

Fuzzy search is implemented in two key places on the frontend:

-   **Main Recipe Search:** `src/app/(root)/page.tsx` uses Fuse.js to search the main list of recipes.
-   **Ingredient Selector:** `src/components/IngredientsSelector.tsx` uses Fuse.js to help users find ingredients quickly. 