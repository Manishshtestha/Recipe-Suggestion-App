# Algorithm Documentation: Content-Based Similarity

## 1. Purpose

The Content-Based Similarity algorithm finds recipes that are objectively similar to a given recipe based on their attributes (content). It powers the "Similar Recipes" section on the recipe details page.

This provides a different kind of recommendation from collaborative filtering. Instead of being based on user behavior, it's based on tangible properties like ingredients and cooking style.

## 2. How It Works

This algorithm uses a multi-factor scoring system, which is implemented as an efficient MongoDB Aggregation Pipeline.

1.  **Keyword Extraction:** The algorithm first extracts the most important keywords from the current recipe's title. It filters out short, common words (e.g., "a", "the", "and") to focus on more descriptive terms.

2.  **Multi-Factor Scoring:** It then calculates a set of scores for every other recipe in the database:
    *   **Name Score:** A binary score (1 or 0) is given if a recipe's title matches the extracted keywords.
    *   **Ingredient Score:** The number of ingredients that the two recipes have in common is calculated.
    *   **Cooking Style Score:** A binary score is given if the cooking method is the same.

3.  **Ranking via Multi-Level Sort:** The potential matches are sorted in a specific order of priority:
    1.  Highest `nameScore`
    2.  Highest `sharedIngredients` score
    3.  Highest `sameCookingMethod` score

This cascading sort ensures the most relevant results are ranked highest, and the top 5 are returned.

## 3. Location in Codebase

-   **Backend API:** The core logic is located in `src/app/api/recipes/[recipeId]/similar/route.ts`.
-   **Frontend Component:** The results are fetched and displayed by the `src/components/SimilarRecipes.tsx` component. 