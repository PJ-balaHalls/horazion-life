module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // 1. Motor de Estilização (NativeWind)
      "nativewind/babel",

      // 2. Motor de Animação (Reanimated) - OBRIGATÓRIO SER O ÚLTIMO
      "react-native-reanimated/plugin",
    ],
  };
};
