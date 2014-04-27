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

    Draw.hasPreviousPlace = function() {
      return this.lastPlace.x1 && this.lastPlace.x2 && this.lastPlace.y1 && this.lastPlace.y2;
    };

    Draw.place = function(x, y, rotation) {
      var x2, y2;
      this.context.beginPath();
      this.context.moveTo(x, y);
      x2 = x + (this.brush.height * Math.sin(rotation));
      y2 = y + (this.brush.height * Math.cos(rotation));
      this.context.lineTo(x, y);
      this.context.lineTo(x2, y2);
      this.context.stroke();
      this.lastPlace.x1 = x;
      this.lastPlace.y1 = y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
    };

    Draw.stroke = function(x, y, rotation) {
      var x2, y2;
      if (!this.hasPreviousPlace()) {
        this.place(x, y, rotation);
        return;
      }
      console.log('connect');
      this.context.beginPath();
      this.context.moveTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.lineTo(this.lastPlace.x1, this.lastPlace.y1);
      x2 = x + (this.brush.height * Math.sin(rotation));
      y2 = y + (this.brush.height * Math.cos(rotation));
      this.context.lineTo(x, y);
      this.context.lineTo(x2, y2);
      this.context.lineTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.fill();
      this.lastPlace.x1 = x;
      this.lastPlace.y1 = y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
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
    var handMesh, screenPosition;
    console.log('h');
    handMesh = hand.data('riggedHand.mesh');
    screenPosition = handMesh.screenPosition(hand.indexFinger.tipPosition, controller.plugins.riggedHand.camera);
    return Draw.stroke(screenPosition.x, window.innerHeight - screenPosition.y, 0);
  });

  canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  Draw.context = canvas.getContext("2d");

  Draw.place(100, 100, 0 * TO_RAD);

  Draw.place(110, 100, 10 * TO_RAD);

  Draw.stroke(260, 100, -5 * TO_RAD);

}).call(this);
