module.exports = {
    root: true, // 根配置文件
    parserOptions: {
        ecmaVersion: 2021
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "plugin:vue/vue3-recommended",      // vue3 推荐配置   
        "eslint:recommended",               // eslint 推荐配置
        "@vue/typescript/recommended",       // ts 推荐配置
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
    ],
    rules: {
        "no-unused-vars": "off",
    }
}