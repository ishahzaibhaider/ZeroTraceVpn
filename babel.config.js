module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Temporarily disabled NativeWind to fix PostCSS error
      // Re-enable when ready to use Tailwind classes
      // 'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};

