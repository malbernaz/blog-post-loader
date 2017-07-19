# blog-post-loader

A very simple markdown loader that accepts yml meta data.

## How it works

Given the input:

```md
---
title: a title
description: test description
---

# heading 1

- buy pineapple

## heading 2

_italic_ is the new __bold__
```

`blog-post-loader` returns an output:

```js
{
  meta: {
    title: "a title",
    description: "test description"
  },
  html: "...parsed markdown..."
}
```

## How to configure

Install `blog-post-loader`:

```sh
npm install blog-post-loader
```

and configure your `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md/$,
        loader: "blog-post-loader",
        options: {/* ... */} // marked options. See https://github.com/chjj/marked#options-1
      }
    ]
  }
}
```


## License

[MIT](https://github.com/malbernaz/blog-post-loader/blob/master/LICENSE)
