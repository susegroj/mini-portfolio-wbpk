/* Configuration File */

const path = require('path');
/* add plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* Create a rule for css file recognition */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* Adding copy webpack to copy files into dist folder */
// const CopyPlugin = require('copy-webpack-plugin');
/*Adding dot env for env variables */
const DotEnv = require('dotenv-webpack');

module.exports = {
  /* Entry point */
  entry: './src/index.js',
  /* Where will be the compiled files */
  output: {
    /* Path resolve will find the dir anywhere in the project
      @folder __dirname : default name folder for resolve,
      @name 'dist': custom name for distribution folder if you like
    */
    path: path.resolve(__dirname, 'dist'),
    // Added hash to files
    filename: '[name].[contenthash].js', /* Name of the compile output file i.e main.js, bundle.js, hash...*/
    assetModuleFilename: "assets/images/[hash][ext][query]",// --> this is the same as 'generator' in asset rule    
  },
  /* Mode(env) to run the file */
  mode: 'development',
  /* watch mode for dev */
  watch: true,
  /* what are the file extensions to work with  */
  resolve: {
    extensions: ['.js'],
    /* To create aliases for better imports */
    alias: {
      "@utils": path.resolve(__dirname, 'src/utils/'),
      "@templates": path.resolve(__dirname, 'src/templates/'),
      "@styles": path.resolve(__dirname, 'src/styles/'),
      "@images": path.resolve(__dirname, 'src/assets/images/'),
      "@fonts": path.resolve(__dirname, 'src/assets/fonts/')
    }
  },
  module: {
    /* COnnecting webpack with babel */
    rules : [
      /* Rule for modern js */
      {
        /* Extensions to work with */
        test: /\.m?js$/, // work with mjs or js
        /* Excluding node_modules avoiding errors */
        exclude: /node_modules/,
        /* making use of loaders */
        use: {
          loader: 'babel-loader'
        }
      },
      /* Rules for css and preprocessor */
      {
        test: /\.css|.styl|.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'stylus-loader',
        ]
      },
      /* Rule for images, no installation need */
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        /* to select the output folder on dist */
        // generator: {
        //   filename: "assets/images/[hash][ext][query]"
        // }
      },
      /* Rules for fonts, files, urls */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: "url-loader",
          options: {
        /* to enable or disable base64 files */
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts",
            publicPath: "../assets/fonts",
            esModule: false,
          }
        }
      },
    ]
  },
  plugins: [
    /* Compile & compress html file and put them in dist withe the filename */
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    /* Compile & compress css files */
    new MiniCssExtractPlugin({
      // this is the output source 
      filename: "assets/[name].[contenthash].css"
    }),
    new DotEnv()
    /* To copy files into dist
      Used for images fis, then we implement the asset loader from webpack
    */
    // new CopyPlugin({
    //   patterns: [
    //     /* Here going to copy the images from, to dist folder */
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: "assets/images"
    //     }
    //   ]
    // })
  ], 
};