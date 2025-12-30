# Metro EMFILE Fix (Without Watchman)

## The Problem

Metro bundler was trying to watch thousands of files in `node_modules`, causing the "EMFILE: too many open files" error.

## The Solution

The fix is in `metro.config.js`:

1. **`watchFolders` is set to ONLY watch `src/` directory**
   - Metro will still resolve `node_modules` for bundling (resolver works independently)
   - But the file watcher will ONLY monitor your source code for changes
   - This reduces watched files from thousands to just your source files

2. **`blockList` prevents nested node_modules resolution**
   - Prevents Metro from unnecessarily traversing deeply nested node_modules
   - Reduces file system operations

3. **Watcher health checks**
   - Helps detect and recover from stale file watchers

## How It Works

- **File Watcher**: Only watches `src/` directory (your code)
- **Module Resolver**: Still resolves from project root `node_modules` (for bundling)
- **Result**: Metro can bundle your app AND watch for changes, but only watches your source files

## Testing

After applying this fix:

```bash
# Clear Metro cache
rm -rf .expo

# Start Expo
npm start
```

The EMFILE error should be resolved because Metro is now only watching your `src/` directory instead of thousands of files in `node_modules`.

## Why This Works Without Watchman

- Watchman is a file watching service that's more efficient
- But Metro can work without it using Node.js's built-in file watcher
- The key is limiting what gets watched, not how it watches
- By only watching `src/`, we reduce the number of files from thousands to hundreds

