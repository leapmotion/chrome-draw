(function() {
  window.Draw = (function() {
    function Draw() {}

    Draw.context = null;

    Draw.brush = {
      width: 10,
      height: 40
    };

    Draw.lastPlace = {
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };

    Draw.place = function(x, y, rotation) {
      console.log('point', arguments);
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + (this.brush.height * Math.sin(rotation)), y + (this.brush.height * Math.cos(rotation)));
      return this.context.stroke();
    };

    Draw.stroke = function() {
      return console.log('connect');
    };

    return Draw;

  })();

}).call(this);

(function() {
  var canvas;

  window.TO_RAD = Math.PI / 180;

  window.TO_DEG = 1 / TO_RAD;

  window.controller = new Leap.Controller;

  controller.connect().use('riggedHand', {}).on('hand', function(hand) {
    return console.log('h');
  });

  canvas = document.getElementById("canvas");

  Draw.context = canvas.getContext("2d");

  Draw.place(10, 10, 25 * TO_RAD);

}).call(this);
