const CracoAntDesignPlugin = require("craco-antd"); 
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent"); 

module.exports = {
    plugins: [
      {
        plugin: CracoAntDesignPlugin, 
        options: { 
          cssLoaderOptions: { 
            modules: { 
              localIdentName: "[local]___[hash:base64:5]", 
            }, 
          }, 
          babelPluginImportOptions: { 
            libraryDirectory: "es", 
          }, 
        }, 
      },
    ],
  };