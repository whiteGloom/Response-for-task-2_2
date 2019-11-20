function map(el){
	this.base = el;
	this.mapHolder = $(this.base).find(".js-map__holder").first();
	this.findMeButton = $(this.base).find(".js-map__button_type_me");
	this.findMarkerButton = $(this.base).find(".js-map__button_type_marker");

	this.position = $(this.base).data("coordinates");
	this.markerPosition = this.position;
	this.myPosition;
	this.map = new google.maps.Map(this.mapHolder[0], {
		center: this.position,
		zoom: 15
	});
	this.mark = new google.maps.Marker({position: this.position, map: this.map, icon: "./static/images/map-marker.png"})
}

map.prototype.findMe = function() {
	$(this.findMeButton).on("click", $.proxy(function(){
		infoWindow = new google.maps.InfoWindow;
	    if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				this.map.setCenter(pos);
				this.myPosition = pos;
				this.position = pos;
			}, function() {
				handleLocationError(true, infoWindow, this.map.getCenter());
			});
		} else {
			handleLocationError(false, infoWindow, this.map.getCenter());
	    }

		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
					"Error: The Geolocation service failed." :
					"Error: Your browser doesn\"t support geolocation.");
			infoWindow.open(this.map);
		}
	}, this))
}

map.prototype.findMarker = function() {
	$(this.findMarkerButton).on("click", $.proxy(function(){
		this.map.setCenter(this.markerPosition);
		this.position = this.markerPosition;
	}, this))
}

function makeArray() {
	var arr = [];
	var $maps = $(".map");
	for (var i = 0; i <= $maps.length - 1; i++) {
		arr[i] = new map($maps[i]);
		arr[i].findMarker();
		arr[i].findMe();
	}
	return arr;
}

module.exports.mkArr = makeArray;