const hl = require("highlight.js");
const renderer = require("./markdown-renderer");

function highlight(code) {
  return hl.highlightAuto(code).value;
}

module.exports = { renderer, highlight, sanitize: false };
