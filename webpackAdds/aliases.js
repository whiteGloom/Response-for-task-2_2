module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        resolve : {
            alias: {
                'jchart': base + '/dev/vendors/jquery.jchart.js'
            }
        }
    }
};

// -whiteGloom