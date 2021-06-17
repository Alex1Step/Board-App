const CracoAntDesignPlugin = require('craco-antd');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                cssLoaderOptions: {
                    modules: {
                        localIdentName: '[local]___[hash:base64:5]',
                    },
                },
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1DA57A',
                            '@board-name-font-size': '24px !important',
                            '@h1-username': '32px !important',
                        },
                        javascriptEnabled: true,
                    },
                },
                babelPluginImportOptions: {
                    libraryDirectory: 'es',
                },
            },
        },
    ],
};
