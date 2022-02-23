const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: 'all',
        }
    };

    if(isProd) {
        configObj.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return configObj
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
    },
    devtool: 'source-map',
    devServer: {
        port: 3000,
        open: true,
    },
    optimization: optimization(),
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
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 70,
                    },
                    optipng: {
                        optimizationLevel: 2,
                    },
                    pngquant: {
                      quality: [0.65, 0.90],
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75
                    },
                }
            }
            ], 
             },
    }
