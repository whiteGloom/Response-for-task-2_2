/*
    Файл со списком сокращений.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        resolve : {
            alias: {
                'jquery': base + '/dev/jsPlugins/jquery-3.3.1.js',
                'jchart': base + '/dev/jsPlugins/jquery.jchart.js'
            }
        }
    }
};

// -whiteGloom