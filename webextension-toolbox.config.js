const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    config.module.rules.push({
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ],
    });
    config.plugins.push(new VueLoaderPlugin())

    return config;
  },
  copyIgnore: [ '**/*.js', '**/*.json', '**/*.vue' ],
}
