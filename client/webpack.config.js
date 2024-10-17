const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = () => {
  return {
    mode: 'development', // Switch to 'production' for production builds
    entry: {
      main: './src/js/index.js', // Your entry points for JavaScript
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js', // Bundle naming pattern
      path: path.resolve(__dirname, 'dist'), // Output directory
    },
    plugins: [
      // HtmlWebpackPlugin to copy index.html to the dist folder
      new HtmlWebpackPlugin({
        template: './client/index.html', // Path to index.html in client folder
        title: 'PWA Text Editor',
      }),
      // WebpackPwaManifest to generate the manifest.json file
      new WebpackPwaManifest({
        name: 'PWA Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor Progressive Web Application',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: './', // Starting URL for the PWA
        publicPath: './', // Public path for assets
        icons: [
          {
            src: path.resolve(__dirname, 'client/src/images/logo.png'), // Path to your logo
            sizes: [96, 128, 192, 256, 384, 512], // Multiple icon sizes for PWA
            destination: path.join('assets', 'icons'), // Destination folder inside dist
          },
        ],
      }),
      // InjectManifest to inject your custom service worker
      new InjectManifest({
        swSrc: './client/src-sw.js', // Custom service worker in client folder
        swDest: 'service-worker.js', // Output file in dist
      }),
    ],
    module: {
      rules: [
        // CSS loader to handle CSS files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Loaders for CSS files
        },
        // Babel loader to transpile modern JavaScript
        {
          test: /\.m?js$/, // Matches both .js and .mjs files
          exclude: /node_modules/, // Don't transpile node_modules
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Preset for ES6+ support
            },
          },
        },
      ],
    },
  }
}
