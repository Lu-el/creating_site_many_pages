const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
    },
    devServer: {
        port: 3000,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin ({
            filename: `./css/${filename('css')}`
        })
    ],
    module: {
        rules: [
            {
                test:/\.html$/,
                loader: 'html-loader',
            },
            {
               test: /\.css$/i,
               use: [MiniCssExtractPlugin.loader, "css-loader"], 
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath, context) + '/');
                            }
                        }
                    },
                    MiniCssExtractPlugin.loader, "css-loader", 'sass-loader'], 
             },
             {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[contenthash:6][ext][query]'
                    }
                }], 
             },
    }
