# Troubleshooting Guide

## EMFILE: too many open files error

This error occurs when Metro bundler tries to watch too many files. Here are solutions:

### Solution 1: Install Watchman (Recommended)

Watchman is Facebook's file watching service that's much more efficient than Node's built-in watcher.

**Install via Homebrew:**
```bash
brew install watchman
```

**Verify installation:**
```bash
watchman --version
```

After installing, restart your Expo dev server:
```bash
npm start
```

### Solution 2: Increase File Descriptor Limit (Temporary)

If you can't install Watchman, you can temporarily increase the limit:

```bash
ulimit -n 4096
npm start
```

**Note:** This only lasts for the current terminal session. To make it permanent, add to your `~/.zshrc`:
```bash
ulimit -n 4096
```

### Solution 3: Clean Metro Cache

Sometimes clearing the cache helps:

```bash
# Stop the current server (Ctrl+C)
npx expo start --clear
```

### Solution 4: Exclude Large Directories

The `metro.config.js` has been optimized to exclude unnecessary directories. If you still have issues, you can add more exclusions:

```javascript
config.resolver.blockList = [
  /.*\/node_modules\/.*\/node_modules\/.*/,
  /.*\/\.git\/.*/,
  /.*\/\.expo\/.*/,
  /.*\/android\/build\/.*/,  // Add if building Android
  /.*\/ios\/build\/.*/,      // Add if building iOS
];
```

### Solution 5: Use Watchman (if installed)

If Watchman is installed, Metro will automatically use it. You can verify:

```bash
watchman watch-list
```

## Other Common Issues

### Port Already in Use

If port 8081 is already in use:

```bash
# Kill the process using port 8081
lsof -ti:8081 | xargs kill -9

# Or use a different port
npx expo start --port 8082
```

### Metro Bundler Cache Issues

Clear cache and restart:

```bash
npx expo start --clear
```

### Node Modules Issues

Reinstall dependencies:

```bash
rm -rf node_modules
npm install
```

