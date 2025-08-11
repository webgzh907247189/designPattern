"use strict";

const plugin = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "commit code for prompt comment",
      recommended: true, // 是否是推荐的
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`  -->  是否自动修复
    schema: [
      {
        type: "integer",
        minimum: 0,
      },
    ],
    messages: {
      commentTooLittle:
        "当前提交的文件 注释代码行数太少, 建议每 {{ratio}} 行代码至少需要一行注释",
    },
  },

  create(context) {
    const ratio = context.options[0] || 20;

    return {
      Program(node) {
        const comments = context.sourceCode.getAllComments();

        // 一行注释都没有，就算1
        const commentsLen = comments.length > 0 ? comments.length : 1;

        if(comments.length === 0){
          // 每 20行 代码起码一行注释
          context.report({
            node,
            data: { ratio },
            messageId: 'commentTooLittle',
          })
          return
        }

        const lines = context.sourceCode.getLines();
        const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

        const realCodeLen = nonEmptyLines.length - commentsLen;

        // console.log(
        //   "注释代码行数：" + commentsLen,
        //   "有效代码行数: " + realCodeLen
        // );

        // 默认 每 20行 代码 需要加一行注释 (有效代码注释比 20)
        if (realCodeLen / commentsLen > ratio) {
          context.report({
            node,
            data: { ratio },
            messageId: "commentTooLittle",
          });
        }
      },
    };
  },
};

module.exports = plugin;
