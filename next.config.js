const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  distDir: '../.next',
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.css$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    });

    if (!dev) {
      config.module.rules.push({
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                url: true,
                sourceMap: false,
                minimize: true,
                localIdentName: false
                  ? '[name]-[local]-[hash:base64:5]'
                  : '[hash:base64:5]'
              }
            },
            { loader: 'postcss-loader' }
          ]
        })
      });

      config.plugins.push(new ExtractTextPlugin('app.css'));
    } else {
      config.module.rules.push({
        test: /\.css$/,
        use: [{ loader: 'raw-loader' }, { loader: 'postcss-loader' }]
      });
    }

    return config;
  }
};