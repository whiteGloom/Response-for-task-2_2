// Test scripts
$(document).ready(() => {
	var inputs 	= input.mkArr();
	var toggles = toggle.mkArr();
	var ticks 	= tick.mkArr();
	var forms 	= form.mkArr();
	var bars 	= bar.mkArr();
	window.initMap = map.mkArr;

	$('.calendar__holder').datetimepicker({
		date: new Date(),
		firstDayOfWeek: 1
	});


	
	chart.newChart({
		target: '#chartTestFirst',
		type: 'progress',
		title: '89',
		values: [
			{
				value: 89
			}
		]
	});
	chart.newChart({
		target: '#chartTestSecond',
		type: 'progress',
		title: '50',
		values: [
			{
				value: 50
			}
		]
	});
	chart.newChart({
		target: '#chartTestThird',
		type: 'pie',
		values: [
			{
				value: 10,
				color: '#747474'
			},
			{
				value: 30,
				color: '#e75735'
			},
			{
				value: 30,
				color: '#4eb7a8'
			},
			{
				value: 30,
				color: '#e5e5e5'
			}
		]
	});
    $("#sliderSimpleTest").ionRangeSlider({
    	min: 0,
    	max: 100,
        from: 40,
        skin: "simple"
    });
    $("#sliderPipsTest").ionRangeSlider({
    	min: 0,
    	max: 100,
        from: 40,
        grid: true,
        skin: "pips"
    });
	$('#stepbarTest').stepbar({
		items: ['1', '2', '3', '4', '5'],
		current: 3
	});
});
