// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const projectRoot = __dirname;
const srcPath = path.resolve(projectRoot, 'src');

// CRITICAL FIX #1: Only watch src/ directory - NOT node_modules
// This tells Metro's file-map to ONLY watch src/, dramatically reducing watched files
// Metro's resolver will still find node_modules for bundling (they work independently)
config.watchFolders = [srcPath];

// CRITICAL FIX #2: Block nested node_modules from being watched
// This prevents Metro from watching nested node_modules, but allows root node_modules to be resolved
config.resolver = {
  ...config.resolver,
  blockList: [
    // Block nested node_modules (e.g., node_modules/package/node_modules)
    // But NOT root node_modules (needed for @babel/runtime and other dependencies)
    /.*\/node_modules\/.*\/node_modules\/.*/,
    // Block other unnecessary directories
    /\.git\/.*/,
    /\.expo\/.*/,
    /android\/build\/.*/,
    /ios\/build\/.*/,
    /\.DS_Store$/,
  ],
};

// CRITICAL FIX #3: Reduce workers to 1 to minimize file descriptor usage
config.maxWorkers = 1;

// Configure watcher with health checks
config.watcher = {
  ...config.watcher,
  healthCheck: {
    enabled: true,
    interval: 2000,
  },
};

module.exports = config;

