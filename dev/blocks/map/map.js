class Map {
  constructor(el) {
    this.$base = el;

    this._init();
    this._findMarker();
    this._findMe();
  }

  _init() {
    this.$mapHolder = this.$base.find('.js-map__holder').first();
    this.$findMeButton = this.$base.find('.js-map__button_type_me');
    this.$findMarkerButton = this.$base.find('.js-map__button_type_marker');

    this.position = this.$base.data('coordinates');
    this.markerPosition = this.position;
    this.myPosition = 0;
    this.map = new window.google.maps.Map(this.$mapHolder[0], {
      center: this.position,
      zoom: 15,
    });
    this.mark = new window.google.maps.Marker({
      position: this.position,
      map: this.map,
      icon: './static/images/map-marker.png',
    });
  }

  _findMe() {
    function finder() {
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : 'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.map);
      }

      const infoWindow = new window.google.maps.InfoWindow();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.map.setCenter(pos);
          this.myPosition = pos;
          this.position = pos;
        }, function err() {
          handleLocationError(true, infoWindow, this.map.getCenter());
        });
      } else {
        handleLocationError(false, infoWindow, this.map.getCenter());
      }
    }

    this.$findMeButton.on('click', $.proxy(finder, this));
  }


  _findMarker() {
    function finder() {
      this.map.setCenter(this.markerPosition);
      this.position = this.markerPosition;
    }

    this.$findMarkerButton.on('click', $.proxy(finder, this));
  }
}

function makeMaps() {
  const maps = [];
  $('.js-map').each((i, el) => {
    maps.push(new Map($(el)));
  });
  return maps;
}

export default makeMaps;
