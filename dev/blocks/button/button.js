class Ripple {
  constructor(el) {
    this.element = el;
    this._init();
  }

  _handlerMousedown(e) {
    clearTimeout(this.timerId);
    const ripple = this.element.querySelector(`.js-${this.element.classList[0]}__rippleEffect`);
    const size = this.element.offsetWidth;
    const pos = this.element.getBoundingClientRect();
    const x = e.pageX - pos.left - window.pageXOffset - size;
    const y = e.pageY - pos.top - window.pageYOffset - size;
    ripple.style = `top: ${y}px; left: ${x}px; width: ${size * 2}px; height: ${size * 2}px;`;
    ripple.classList.remove(`${this.element.classList[0]}__rippleEffect_active`);
    ripple.classList.remove(`${this.element.classList[0]}__rippleEffect_start`);
    setTimeout(() => {
      ripple.classList.add(`${this.element.classList[0]}__rippleEffect_start`);
      setTimeout(() => {
        ripple.classList.add(`${this.element.classList[0]}__rippleEffect_active`);
      });
    });
  }

  _handlerMouseup() {
    const ripple = this.element.querySelector(`.js-${this.element.classList[0]}__rippleEffect`);
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      ripple.classList.remove(`${this.element.classList[0]}__rippleEffect_active`);
      ripple.classList.remove(`${this.element.classList[0]}__rippleEffect_start`);
    }, 500);
  }

  _addListeners() {
    this.element.addEventListener('mousedown', this._handlerMousedown.bind(this));
    this.element.addEventListener('mouseup', this._handlerMouseup.bind(this));
  }

  _init() {
    this._addListeners();
  }
}

function makeRipple(el) {
  return new Ripple(el);
}

const buttons = Array.from(document.getElementsByClassName('js-button'));
buttons.forEach(makeRipple);
