module.exports.newChart = function (options) {
	var options = options ? options : {};
	var target 	= options.target ? options.target: '',
		type 	= options.type ? options.type : 'progress',
		title 	= options.title ? options.title : '',
		values 	= options.values ? options.values : [];

	var defaults = {
		data: [],
		appearance: {
			type: 'donut',
			gap: 0,
			baseColor: 'transparent'
		}
	};

	switch(type) {
		case 'pie':
			for(var i = 0; i < values.length; i++) {
				values[i].strokeWidth = 8;
				values[i].color = {
					normal: values[i].color,
					active: values[i].color
				};
			};
			defaults.data = defaults.data.concat(values);
			defaults.appearance.title = {
				showSummary: false
			};
			break;

		case 'progress':
			values[0].strokeWidth = 2;
			values[0].color = {
				normal: values[0].color ? values[0].color: '#e75735',
				active: values[0].color ? values[0].color: '#e75735'
			};
			defaults.data = defaults.data.concat(values[0], {value: 100 - values[0].value, draw: false});
			defaults.appearance.title = {
				summaryTitle: title,
				showSummary: true
			};
			break;

		default:
			for(var i = 0; i < values.length; i++) {
				values[i].color = {
					normal: values[i].color,
					active: values[i].color
				};
			};
			defaults.data = defaults.data.concat(values);
			defaults.appearance.title = {
				showSummary: false
			};
			break;
	}

	return $(target).jChart(defaults)
	}
