# Algorithm Documentation: Collaborative Filtering

## 1. Purpose

The Collaborative Filtering algorithm provides personalized recipe recommendations to users. Its goal is to answer the question: **"What other recipes would a user like, based on the behavior of other users with similar tastes?"**

This algorithm powers the "You Might Also Like" section on the recipe details page, offering suggestions that are not strictly based on content but on community behavior, leading to more serendipitous discovery.

## 2. How It Works

The algorithm is implemented as a multi-stage aggregation pipeline in MongoDB, which makes it highly efficient. The process is as follows:

1.  **Identify Similar Users:** When a user is viewing a recipe, the system first identifies all other users who have also "liked" that same recipe. This group of users is considered to have similar tastes.

2.  **Aggregate Liked Recipes:** The algorithm then gathers a complete list of *all other* unique recipes that this group of "similar users" has liked. The original recipe is excluded from this list.

3.  **Score and Rank:** Each of these potential recommendations is scored based on how many users from the "similar" group have liked it. The more likes a recipe has from this group, the higher its `recommendationScore`.

4.  **Sort and Limit:** The list is then sorted in descending order based on the `recommendationScore`, and the top 5 results are returned to be displayed to the user.

## 3. Location in Codebase

-   **Backend API:** The core logic is located in `src/app/api/recipes/[recipeId]/recommendations/route.ts`.
-   **Frontend Component:** The recommendations are fetched and displayed by the `src/components/RecommendedRecipes.tsx` component. 