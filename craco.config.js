const CracoAntDesignPlugin = require('craco-antd');
// const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
// const CracoAlias = require('craco-alias');
// import CracoAntDesignPlugin from 'craco-antd';
// import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
// import CracoAlias from 'craco-alias';

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
