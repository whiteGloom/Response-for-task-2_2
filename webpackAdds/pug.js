/*
    Файл с инструкциями для обработки Pug файлов.
*/

const HTMLWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = function(paths) {
    return {
        module: {
            rules: [
				{
				    test: /\.pug$/,
				    loader: 'pug-loader',
					exclude: /node_modules/
				}
            ]
        },
        plugins: [
			new HTMLWebpackPlugin({
				template: paths + "/dev/index.pug",
				inject: false,
				minify: false
			}),
	        new HtmlBeautifyPlugin({
		        config: {
		            html: {
		                indent_with_tabs: true,
		                inline: [],
		                unformatted: ['p', 'i', 'b', 'span']
		            }
		        }
		    })
		]
    }
};

// -whiteGloom
