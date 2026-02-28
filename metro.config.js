const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    // Permite importar SVGs como componentes: import Logo from './logo.svg'
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  config.resolver = {
    ...resolver,
    // Remove svg da lista de assets (arquivo estático)
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    // Adiciona svg na lista de fontes (arquivo compilável)
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
