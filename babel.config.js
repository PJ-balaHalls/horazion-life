module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // FE-HZ: Adicionado plugin do NativeWind necessário para compilar as classes do Tailwind
      'nativewind/babel',
      // ARCH-HZ: O Reanimated DEVE obrigatoriamente ser o último plugin da lista
      'react-native-reanimated/plugin',
    ],
  };
};