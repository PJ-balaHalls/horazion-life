module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // O Reanimated DEVE ser o último plugin da lista
      'react-native-reanimated/plugin',
    ],
  };
};