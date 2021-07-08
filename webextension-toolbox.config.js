const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    });
    config.plugins.push(new VueLoaderPlugin())

    return config;
  }
}
