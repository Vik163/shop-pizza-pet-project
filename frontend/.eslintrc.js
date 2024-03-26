module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      // "standard-with-typescript",
      'airbnb',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
   ],
   overrides: [
      {
         env: {
            node: true,
         },
         files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 'latest',
      // "project": './tsconfig.json',
      // "tsconfigRootDir": __dirname,
      sourceType: 'module',
   },
   globals: {
      __IS_DEV__: true,
      __API__: true,
      __PROJECT__: true,
   },
   plugins: [
      'react',
      '@typescript-eslint',
      'react-hooks',
      'unused-imports',
      'ulbi-tv-plugin',
      'prettier',
      'ulbi-eslint-plugin',
   ],
   ignorePatterns: [
      'vite.config.ts', // Add this line
   ],
   root: true,
   rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [
         2,
         { extensions: ['.js', '.jsx', '.tsx'] },
      ],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'warn', // 13_8
      'react/display-name': 'off', // добавлять имя класса или функции
      'react/require-default-props': 'off', //  к пропсам по умолчанию добавлять isRequired
      'react/react-in-jsx-scope': 'off', // требует импорт React
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'no-shadow': 'off', // -------------------------------------------
      '@typescript-eslint/no-shadow': ['error'], // обнаруживает повторное объявление переменных
      'consistent-return': 'off', // отключать
      'import/extensions': 'off', // отключать если в импортах не указываются расширения файлов
      'import/no-extraneous-dependencies': 'off', // ищет зависимости установленные не туда
      'no-underscore-dangle': 'off', // запрещает нижнее подчеркивание в идентификаторах
      // '@typescript-eslint/strict-boolean-expressions': 'error',
      'jsx-a11y/no-static-element-interactions': 'off', // нужно добалять модель поведения для кликабельных элементов
      'jsx-a11y/click-events-have-key-events': 'off', // , чтобы  люди с нарушениями зрения могли пользоваться
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies,
      'no-param-reassign': 'warn', // запрещает менять значения аргументов функции
      'no-undef': 'error', // Запрещает использование необъявленных переменных, если они не указаны в /*global */ комментариях
      'react/no-array-index-key': 'error', // использование индекса массива как ключа
      'arrow-body-style': 'off', // регулирует правило использования фигурных скобок в строелочных функциях
      'ulbi-tv-plugin/path-checker': ['error', { alias: '@' }], // кастомный плагин 10_2 и 13_2 7min
      'ulbi-tv-plugin/layer-imports': [
         // 13_6 6min
         'error',
         {
            alias: '@',
            ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
         },
      ],
      'ulbi-tv-plugin/public-api-imports': [
         // кастомный плагин 13_3 7min
         'error',
         {
            alias: '@',
            testFilesPatterns: [
               '**/*.test.*',
               '**/*.story.*',
               '**/StoreDecorator.tsx',
            ], // 13_4 1min
         },
      ],
      'linebreak-style': 'error', // LF
      'react/self-closing-comp': 'off', // сжимает пустой компонент
      'react/jsx-max-props-per-line': ['error', { maximum: 3 }], // 14_12 количество пропсов в строчке
      // "ulbi-eslint-plugin/rule-name": 2,
      // "ulbi-tv-plugin/rule-name": 2
   },
};
