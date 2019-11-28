(function stpbr($) {
  function fillCircle(x, y, s, color, ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  $.fn.stepbar = function stepbar(opts) {
    const items = opts.items || [];
    const color = opts.color || '#e5e5e5';
    const fontColor = opts.fontColor || '#888888';
    const selectedColor = opts.selectedColor || '#e75735';
    const selectedFontColor = opts.selectedFontColor || '#fff';
    const current = opts.current || 1;

    const stepBulletSize = 29;
    const fontSize = 14;

    const me = $(this);
    const w = me.width();

    const canvas = document.createElement('canvas');
    $(canvas).appendTo(me);

    const layer1 = canvas.getContext('2d');

    const canvas2 = document.createElement('canvas');
    const layer2 = canvas2.getContext('2d');

    $([canvas, canvas2]).each((i, el) => {
      $(el).attr('width', w);
      $(el).attr('height', 50);
      $(el).css({ width: '100%' });
    });

    const stepSize = Math.floor((w - stepBulletSize) / (items.length - 1));
    const stepMiddle = stepBulletSize / 2;

    for (let i = 0; i < items.length; i += 1) {
      const thisX = (i * stepSize) + stepMiddle;
      const thisY = 20;

      // Draw the bullet
      // Background
      fillCircle(thisX, thisY, stepBulletSize, color, layer2);
      layer2.fillStyle = fontColor;

      // Draw lines
      const lineHeight = stepBulletSize / 7;
      const lineWidth = Math.ceil(stepSize / 2);
      const lineTop = thisY - (lineHeight / 2);

      const lineLeft = thisX - lineWidth;
      const lineRight = thisX;

      // Left
      if (i !== 0) {
        layer1.fillStyle = color;
        layer1.fillRect(lineLeft, lineTop, lineWidth, lineHeight);

        if (i < current) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineLeft, lineTop, lineWidth, lineHeight);
        }
      }

      if (i < items.length - 1) {
        layer1.fillStyle = color;
        layer1.fillRect(lineRight, lineTop, lineWidth, lineHeight);

        if (i < current - 1) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineRight, lineTop, lineWidth, lineHeight);
        }
      }

      // Draw selected bullet
      if (i < current) {
        fillCircle(thisX, thisY, stepBulletSize, selectedColor, layer2);
        layer2.fillStyle = selectedFontColor;
      }

      // Text and number
      layer2.font = `bold ${fontSize}px "Lato"`;
      let metrics;
      const iLabel = `${(i + 1)}`;
      metrics = layer2.measureText(iLabel);

      layer2.fillText(iLabel, thisX - (metrics.width / 2), thisY + (fontSize / 2.5));

      layer2.font = `${fontSize}px "Lato-black"`;
      metrics = layer2.measureText(items[i]);
      layer2.fillStyle = fontColor;
    }
    layer1.drawImage(canvas2, 0, 0);
  };
}($));

$('.js-stepbar').each((i, el) => {
  $('.js-stepbar').stepbar($(el).data());
});