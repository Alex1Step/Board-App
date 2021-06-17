module.exports = {
    parser: '@typescript-eslint/parser', // Указывает парсер ESLint

    plugins: [],

    extends: [
        'plugin:react/recommended', // Использует рекомендуемые правила из @eslint-plugin-react

        'plugin:@typescript-eslint/recommended', // Использует рекомендуемые правила из @typescript-eslint/eslint-plugin

        'plugin:prettier/recommended', //Строка должна быть последней!!! Включает eslint-plugin-prettier и отображает более красивые ошибки как ошибки ESLint
    ],

    parserOptions: {
        ecmaVersion: 2018, //Позволяет проверять современные функции ECMAScript

        sourceType: 'module', //Разрешает использование импорта

        ecmaFeatures: {
            jsx: true, // Разрешает проверку JSX
        },
    },

    env: {},

    rules: {
        // Правила ESLint. Может использоваться для перезаписи правил из расширенных конфигов
        // например "@ typescript-eslint / явный-возвращаемый-тип-функции": "выкл.",
    },

    settings: {
        react: {
            version: 'detect', // eslint-plugin-react автоматически определяет версию React
        },
    },
};
