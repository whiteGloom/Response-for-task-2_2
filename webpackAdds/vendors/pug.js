const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

function config(options = {}) {
  const { base } = options;
  return {
    module: {
      rules: [
        {
          test: /\.(pug|html)/,
          loader: 'pug-loader',
          exclude: /[\\/]node_modules[\\/]/,
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: `${base}/dev/views/home/home.pug`,
        filename: 'index.html',
        inject: false,
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${base}/dev/views/about/about.pug`,
        filename: 'about.html',
        inject: false,
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${base}/dev/views/contacts/contacts.pug`,
        filename: 'contacts.html',
        inject: false,
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${base}/dev/views/uikit/uikit.pug`,
        filename: 'uikit.html',
        inject: false,
        minify: false,
      }),
      new HtmlBeautifyPlugin({
        config: {
          html: {
            indent_with_tabs: true,
            inline: [],
            unformatted: ['p', 'i', 'b', 'span'],
          },
        },
      }),
    ],
  };
}

module.exports = config;
