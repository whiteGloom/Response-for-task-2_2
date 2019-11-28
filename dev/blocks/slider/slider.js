require('ion-rangeslider');

class Slider {
  constructor($el) {
    this.$base = $el;
    this.$holder = this.$base.find('.js-slider__holder');
    this.options = this.$base.data();

    this.makeSlider();
  }

  makeSlider() {
    this.$holder.ionRangeSlider(this.options);
  }
}

$('.js-slider').each((i, el) => {
  new Slider($(el));
});
