/*
    Файл с основной информацией.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
	return {
		mode: 'development',
		entry: {
			'base': base + '/dev/index.js',
			'static': base + '/dev/static.js'
		},
		output: {
			path: base + '/prod/',
			filename: 'scripts/[name].js'
		},
	    module: {
	        rules: [

	        ]
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
						name: "vendors",
						filename: "scripts/[name].js",
						chunks (chunk) {
							return true
						},
						enforce: true
					}
				}
			}
		},
	    resolve : {
	    	
	    },
	    devtool: 'none'
	}
}

// -whiteGloom
