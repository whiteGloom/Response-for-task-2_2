/*
    Файл с основной информацией.
*/

module.exports = function(paths) {
	return {
		mode: 'development',
		entry: paths + "/dev/index.js",
		output: {
			path: paths + "/prod/",
			filename: "scripts.js"
		},
	    module: {
	        rules: [

	        ]
	    },
	    plugins: [

	    ]
	}
}

// -whiteGloom
