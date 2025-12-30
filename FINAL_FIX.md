# Final EMFILE Fix (Without Watchman)

## The Real Problem

Metro's file-map watcher (`NodeWatcher`) is trying to watch the entire project root, including `node_modules`, which has thousands of files. This exceeds macOS file descriptor limits.

## The Solution Applied

1. **`watchFolders` set to ONLY `src/`**
   - Metro's file watcher will only monitor your source code
   - Metro's resolver still finds `node_modules` for bundling (they work independently)

2. **`maxWorkers = 1`**
   - Reduces concurrent file operations
   - Limits file descriptor usage

3. **Package.json scripts updated**
   - All start commands now use `--max-workers=1` flag
   - This ensures Metro uses minimal workers even if config is ignored

## How to Test

```bash
# Clear cache
rm -rf .expo

# Start with reduced workers
npm start
```

## If It Still Fails

If you still get EMFILE errors, try this more aggressive approach:

```bash
# Start Metro with even more restrictions
npx expo start --max-workers=1 --reset-cache
```

## Why This Should Work

- `watchFolders` tells Metro's file-map to only watch `src/`
- `maxWorkers=1` reduces concurrent file operations
- Metro's resolver still works (it doesn't need to watch `node_modules`, just read them)
- This reduces watched files from thousands to just your source files

## Alternative: If Still Failing

If this still doesn't work, the issue might be with nested `node_modules` or symlinks. Try:

```bash
# Check for problematic node_modules structure
find node_modules -type d -name "node_modules" | wc -l

# If the number is very high (>50), consider:
# 1. Removing node_modules and reinstalling
# 2. Using npm ci instead of npm install
# 3. Checking for duplicate dependencies
```

