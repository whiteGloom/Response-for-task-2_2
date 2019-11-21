class Map {
  constructor(el) {
    this.$base = el;
    this.$mapHolder = this.$base.find(".js-map__holder").first();
    this.$findMeButton = this.$base.find(".js-map__button_type_me");
    this.$findMarkerButton = this.$base.find(".js-map__button_type_marker");

    this.position = this.$base.data("coordinates");
    this.markerPosition = this.position;
    this.myPosition;
    this.map = new window.google.maps.Map(this.$mapHolder[0], {
      center: this.position,
      zoom: 15
    });
    this.mark = new window.google.maps.Marker({
      position: this.position,
      map: this.map,
      icon: "./static/images/map-marker.png"
    });

    this.findMarker();
    this.findMe();
  }

  findMe() {
    this.$findMeButton.on("click", $.proxy(function () {
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn\"t support geolocation.");
        infoWindow.open(this.map);
      }

      const infoWindow = new window.google.maps.InfoWindow();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.map.setCenter(pos);
          this.myPosition = pos;
          this.position = pos;
        }, function () {
          handleLocationError(true, infoWindow, this.map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, this.map.getCenter());
      }
    }, this));
  }

  findMarker() {
    this.$findMarkerButton.on("click", $.proxy(function () {
      this.map.setCenter(this.markerPosition);
      this.position = this.markerPosition;
    }, this));
  }
}

function makeMap(el) {
  return new Map($(el));
}

export default makeMap;
