"use strict";

const fm = require("front-matter");
const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function(markdown) {
  const options = loaderUtils.getOptions(this);

  this.cacheable();

  const { attributes, body } = fm(markdown);

  marked.setOptions(options);

  return `module.exports=${JSON.stringify({
    meta: attributes,
    html: marked(body)
  })}`;
};
