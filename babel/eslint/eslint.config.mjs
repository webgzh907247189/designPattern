import globals from "globals";
import pluginJs from "@eslint/js";
import commentprompt from 'eslint-plugin-comment-prompt'


// import commentprompt from './comment-prompt/lib/index.js'

export default [
  // https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs
  pluginJs.configs.recommended,

  { ignores: ['dist'] },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,


        // 定义全局变量
        custom: 'readonly',
        // custom: 'writable'
      },
    },

    plugins: {
      // commentprompt
      'comment-prompt': commentprompt
    },
    rules: {
      "comment-prompt/prompt-comment": ["error", 20],
    },

  },
];

