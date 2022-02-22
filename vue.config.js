module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "./", //相対パスに設定
  chainWebpack: (config) => {
    config.plugin("html").tap((options) => {
      options[0].minify = {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        collapseBooleanAttributes: false,
        removeScriptTypeAttributes: false,
        //filenameHashing: false//ファイル名の後ろに乱数発生をしない
      };
      return options;
    });
  },
  pwa: {
    name: "PWA-Test",
    themeColor: "#CCCCCC", //アプリのフレーム色
    appleMobileWebAppCapable: "yes", //iOSでアドレスバー非表示
    appleMobileWebAppStatusBarStyle: "white", //色
  },
};
