function config(options = {}) {
  const { base } = options;

  return {
    mode: 'development',
    entry: {
      about: `${base}/dev/views/about/about.js`,
      contacts: `${base}/dev/views/contacts/contacts.js`,
      uikit: `${base}/dev/views/uikit/uikit.js`,
      statics: `${base}/dev/static.js`,
    },
    output: {
      path: `${base}/prod/`,
      filename: 'scripts/[name].js',
    },
    module: {
      rules: [
      ],
    },
    plugins: [
    ],
    devServer: {
      stats: 'errors-only',
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/](vendors|node_modules)[\\/]/,
            name: 'vendors',
            filename: 'scripts/[name].js',
            chunks() {
              return true;
            },
            enforce: true,
          },
        },
      },
    },
    resolve: {

    },
    devtool: 'none',
  };
}

module.exports = config;
