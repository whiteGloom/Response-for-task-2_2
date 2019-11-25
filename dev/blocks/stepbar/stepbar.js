// Edited by whiteGloom
(function($) {

  var fillCircle = function(x, y, s, color, ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, s / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  $.fn.stepbar = function(opts) {
    var items = opts.items || [];
    var color = opts.color || '#e5e5e5';
    var fontColor = opts.fontColor || '#888888';
    var selectedColor = opts.selectedColor || '#e75735';
    var selectedFontColor = opts.selectedFontColor || '#fff';
    var current = opts.current || 1;
    
    var stepBulletSize = 29;
    var fontSize = 14;

    var me = $(this);
    var w = me.width();

    var canvas = document.createElement('canvas');
    $(canvas).appendTo(me);

    var layer1 = canvas.getContext('2d');

    var canvas2 = document.createElement('canvas');
    var layer2 = canvas2.getContext('2d');

    $([canvas, canvas2]).each(function() {
      $(this).attr('width', w);
      $(this).attr('height', 50);
      $(this).css({'width': '100%'});
    });

    var stepSize = Math.floor((w - stepBulletSize) / (items.length - 1)); 
    var stepMiddle = stepBulletSize / 2;

    for(var i = 0; i < items.length; i++) {
      var thisX = (i * stepSize) + stepMiddle;
      var thisY = 20;

      // Draw the bullet
      // Background
      fillCircle(thisX, thisY, stepBulletSize, color, layer2);
      layer2.fillStyle = fontColor;

      // Draw lines
      var lineHeight = stepBulletSize / 7;
      var lineWidth = Math.ceil(stepSize / 2);
      var lineTop = thisY - (lineHeight / 2);

      var lineLeft = thisX - lineWidth;
      var lineRight = thisX;

      var selectedLineDelta = lineHeight * 0.7;
      var selectedLineTop = lineTop + selectedLineDelta / 2;
  
      // Left
      if(i !== 0) {
        layer1.fillStyle = color;
        layer1.fillRect(lineLeft, lineTop, lineWidth, lineHeight);

        if(i < current) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineLeft, lineTop , lineWidth, lineHeight);
        }
      }

      //Right 
      if(i < items.length - 1) {
        layer1.fillStyle = color;
        layer1.fillRect(lineRight, lineTop, lineWidth, lineHeight);

        if(i < current - 1) {
          layer2.fillStyle = selectedColor;
          layer2.fillRect(lineRight, lineTop , lineWidth, lineHeight);
        }
      }

      // Draw selected bullet
      if(i < current) {
        fillCircle(thisX, thisY, stepBulletSize, selectedColor, layer2);
        layer2.fillStyle = selectedFontColor;
      }

      // Text and number
      layer2.font = 'bold ' + fontSize + 'px "Lato"';
      var iLabel = (i + 1) + '';
      var metrics = layer2.measureText(iLabel);

      layer2.fillText(iLabel, thisX - (metrics.width / 2), thisY + (fontSize / 2.5));
      
      layer2.font = fontSize + 'px "Lato-black"';
      var metrics = layer2.measureText(items[i]);
      layer2.fillStyle = fontColor;
    }
    layer1.drawImage(canvas2, 0, 0);

  };
})($);
