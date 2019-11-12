/*
    Файл со списком сокращений.
*/

module.exports = function(options) {
    var options = options ? options : {};
    var base = options.base;
    return {
        resolve : {
            alias: {
                'jchart': base + '/dev/vendors/jquery.jchart.js',
                'ionSlider': base + '/dev/vendors/ion.rangeSlider.js',
                'dateTimePicker': base + '/dev/vendors/jquery.datetimepicker.js',
                'stepbar': base + '/dev/vendors/stepbar.js'
            }
        }
    }
};

// -whiteGloom