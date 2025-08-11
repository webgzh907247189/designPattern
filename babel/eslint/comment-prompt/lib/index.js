/**
 * @fileoverview commit code for prompt comment
 * @author comment-prompt
 */
"use strict";

const { configs } = require("@eslint/js");
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");

module.exports = {
    rules: requireIndex(__dirname + "/rules"),
    configs: {
        recommended: {
            plugins: ["comment-prompt"],
            rules: {
                "comment-prompt/prompt-comment": "error"
            }
        }
    }
}


// export * from './rules/prompt-comment' 