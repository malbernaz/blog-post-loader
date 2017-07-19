"use strict";

const path = require("path");
const fs = require("fs");

const test = require("tape");
const webpack = require("webpack");

const markdownOptions = require("./markdown-options");

const webpackConfig = {
  entry: path.resolve(__dirname, "./assets/markdown.md"),
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: require.resolve("../"),
            options: markdownOptions
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: "commonjs2",
    path: __dirname + "/output",
    filename: "bundle.js"
  }
};

const meta = { description: "test description", title: "a title" };

const html =
  '<h1 id="heading-1">heading 1</h1>\n' +
  "<ul>\n<li>buy pineapple</li>\n</ul>\n" +
  '<h2 id="heading-2">heading 2</h2>\n' +
  "<p><em>italic</em> is the new <strong>bold</strong></p>\n" +
  '<pre><code class="lang-javascript"><span class="hljs-attribute">const i</span> = 100;\n' +
  "</code></pre>\n";

test("module loader works", t => {
  webpack(webpackConfig, function onCompilationFinished(err, stats) {
    t.plan(3);

    if (err) {
      return t.end(err);
    }

    if (stats.hasErrors()) {
      return t.end(stats.compilation.errors[0]);
    }

    if (stats.hasWarnings()) {
      return t.end(stats.compilation.warnings[0]);
    }

    const bundle = require("./output/bundle");

    t.equal(bundle.html, html, "actual html is equals to the expected");
    t.looseEqual(bundle.meta, meta, "actual meta is equals to the expected");
    t.looseEqual(bundle, { meta, html });

    t.end();
  });
});
