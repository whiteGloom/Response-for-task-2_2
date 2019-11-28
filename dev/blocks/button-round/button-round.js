const buttons = Array.from(document.querySelectorAll(".js-button-round"));

function makeRipple(el) {
  let timerId;

  el.addEventListener("mousedown", (e) => {
    clearTimeout(timerId);
    const ripple = el.querySelector(`.js-${el.classList[0]}__rippleEffect`);
    const size = el.offsetWidth;
    const pos = el.getBoundingClientRect();
    const x = e.pageX - pos.left - window.pageXOffset - size;
    const y = e.pageY - pos.top - window.pageYOffset - size;
    ripple.style = `top: ${y}px; left: ${x}px; width: ${size * 2}px; height: ${size * 2}px;`;
    ripple.classList.remove(`${el.classList[0]}__rippleEffect_active`);
    ripple.classList.remove(`${el.classList[0]}__rippleEffect_start`);
    setTimeout(() => {
      ripple.classList.add(`${el.classList[0]}__rippleEffect_start`);
      setTimeout(() => {
        ripple.classList.add(`${el.classList[0]}__rippleEffect_active`);
      });
    });
  });

  el.addEventListener("mouseup", (e) => {
    const ripple = el.querySelector(`.js-${el.classList[0]}__rippleEffect`);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      ripple.classList.remove(`${el.classList[0]}__rippleEffect_active`);
      ripple.classList.remove(`${el.classList[0]}__rippleEffect_start`);
    }, 500);
  });
}

buttons.forEach(makeRipple);
