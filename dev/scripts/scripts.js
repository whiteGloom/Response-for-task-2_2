// Test scripts
$(document).ready(function(){
	// $('body').hide();

	// setTimeout(() => {
	// 	$('body').show();
	// }, 2000)
	$('.test').jChart({
	    data: [
	        {
	            value: 300
	        },
	        {
	            value: 300
	        },
	    ],
	    appearance: {
	        type: 'donut',
	        gap: 0
	    }
	})
});