# Algorithm Documentation: LRU Caching

## 1. Purpose

The LRU (Least Recently Used) Cache is a server-side performance optimization. Its purpose is to reduce database load and significantly speed up API response times for frequently requested data, such as the main recipe list.

This makes the application feel much faster and more responsive to the end-user.

## 2. How It Works

We use the `lru-cache` library to implement a caching layer in our API.

1.  **Cache Initialization:** A cache with a fixed size (`max: 100` items) and a TTL (`Time To Live` of 5 minutes) is created on the server.

2.  **Cache-First Strategy:** When a request for a page of recipes arrives at the API:
    *   **Cache Hit:** The API first checks if a valid (non-expired) result for that specific page already exists in the cache. If it does, the cached data is returned immediately, and no database query is performed.
    *   **Cache Miss:** If the data is not in the cache, the API queries the database as usual. The result is then stored in the cache before being returned to the user. Subsequent requests for the same page will now be cache hits.

3.  **Cache Invalidation:** The cache is a snapshot of the data at a point in time. To prevent stale data, we must invalidate it when the underlying data changes. The cache is automatically cleared whenever a new recipe is successfully added via the `POST` request, ensuring that the next `GET` request will fetch fresh data from the database.

## 3. Location in Codebase

-   **Server-Side API:** The LRU Cache is implemented in the `src/app/api/recipes/route.ts` API endpoint. 