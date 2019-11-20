// Test scripts
$(document).ready(() => {
	let inputs = input.mkArr();
	let forms = form.mkArr();
	let dropdowns = dropdown.mkArr();
	let searchbars = searchbar.mkArr();
	window.initMap = map.mkArr();

	$(".js-calendar__holder").datetimepicker({
		date: new Date(),
		firstDayOfWeek: 1
	});

	chart.newChart({
		target: "#Rating",
		type: "progress",
		title: "89",
		values: [
			{
				value: 89
			}
		]
	});

	chart.newChart({
		target: "#Assort",
		type: "progress",
		title: "50",
		values: [
			{
				value: 50
			}
		]
	});

	chart.newChart({
		target: "#Categories",
		type: "pie",
		values: [
			{
				value: 10,
				color: "#747474"
			},
			{
				value: 30,
				color: "#e75735"
			},
			{
				value: 30,
				color: "#4eb7a8"
			},
			{
				value: 30,
				color: "#e5e5e5"
			}
		]
	});

	chart.newChart({
		target: "#0percExample",
		type: "progress",
		title: "0",
		values: [
			{
				value: 0
			}
		]
	});

	chart.newChart({
		target: "#38percExample",
		type: "progress",
		title: "38",
		values: [
			{
				value: 38
			}
		]
	});

	chart.newChart({
		target: "#62percExample",
		type: "progress",
		title: "62",
		values: [
			{
				value: 62
			}
		]
	});

	chart.newChart({
		target: "#89percExample",
		type: "progress",
		title: "89",
		values: [
			{
				value: 89
			}
		]
	});

	chart.newChart({
		target: "#pieExample",
		type: "pie",
		values: [
			{
				value: 10,
				color: "#747474"
			},
			{
				value: 30,
				color: "#e75735"
			},
			{
				value: 30,
				color: "#4eb7a8"
			},
			{
				value: 30,
				color: "#e5e5e5"
			}
		]
	});

	$(".js-slider__holder").eq(0).ionRangeSlider({
		min: 0,
		max: 100,
		from: 40,
		skin: "simple"
	});

	$(".js-slider__holder").eq(1).ionRangeSlider({
		min: 0,
		max: 100,
		from: 75,
		grid: true,
		skin: "pips"
	});

	$(".js-stepbar").stepbar({
		items: ["1", "2", "3", "4", "5"],
		current: 3
	});
});
