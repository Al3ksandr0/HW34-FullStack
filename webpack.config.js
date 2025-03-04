// npm run dev = запуск серва с HMR, файлы в памяти
// npm run build = сборка dist с минификацией (prod), хеш меняется при ток при изменениях
// npm run watch = check change, пересборка dist без серва
// npm run clean = удалить dist и пересобрать проект с нуля

import path from 'path';
import { fileURLToPath } from 'url';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: process.env.NODE_ENV || 'development',
    // production для фин сборки, development не для фин, если не указано = то по дефолту будет dev, если в скрпитах прописано dev или prd
    entry: './src/js/app.js',
    output: {
        filename: process.env.NODE_ENV === 'production' ? 'main.[contenthash].js' : 'main.js', // контентхеш нужен ток при продакшон
        path: path.resolve(__dirname, 'dist'),
        clean: true, // вместо CleanWebpackPlugin, встрен в 5 версии вебпака
    },
    resolve: {
        extensions: ['.js', '.json', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            "@scss": path.resolve(__dirname, "src/scss"),
            "@js": path.resolve(__dirname, "src/js"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader', // es6 to es5 для старых..
            },
            {
                test: /\.scss$/,
                use: [
                    //MiniCssExtractPlugin только для продакшина, так как он вытаскивает css в отдельный файл. в dev он тормозит обновление данных, т к пересобирает весь проект, и еще ток он работает с hmr
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif|webp|avif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash][ext]',
                },
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body' // вставляет в index.html перед тем как body закрыть
        }),
        new MiniCssExtractPlugin({ //плагин вытаскивает css из js и создает отдельный файл, по сути можно и использовать style-loader, но css тогда загружеться после js, для маленького проетка вроде бы безразницы, но если довольно таки большой проект, то по идеии это замедляет
            filename: 'styles.[contenthash].css',
        }),
    ],
    optimization: {
        splitChunks: false, // у меня не так много кода чтобы делать чанки
    },
    devServer: {
        static: './dist',
        port: 3003,
        host: 'localhost',
        open: true, // автомат отркем в браузере
        hot: true, // обновляет без перезагрузки стили. не работает? - работает только c dev
        watchFiles: ['src/**/*'],
    },
}