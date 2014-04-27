(function() {
  window.Pen = (function() {
    function Pen(options) {
      if (options == null) {
        options = {};
      }
      this.context = options.context;
      this.tip = {
        width: 10,
        height: 40
      };
      this.lastPlace = {
        x1: null,
        y1: null,
        x2: null,
        y2: null
      };
    }

    Pen.prototype.hasPreviousPlace = function() {
      return this.lastPlace.x1 && this.lastPlace.x2 && this.lastPlace.y1 && this.lastPlace.y2;
    };

    Pen.prototype.place = function(x, y, rotation) {
      var x2, y2;
      this.context.beginPath();
      this.context.moveTo(x, y);
      x2 = x + (this.tip.height * Math.sin(rotation));
      y2 = y + (this.tip.height * Math.cos(rotation));
      this.context.lineTo(x, y);
      this.context.lineTo(x2, y2);
      this.context.stroke();
      this.lastPlace.x1 = x;
      this.lastPlace.y1 = y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
    };

    Pen.prototype.stroke = function(x, y, rotation) {
      var x2, y2;
      if (!this.hasPreviousPlace()) {
        this.place(x, y, rotation);
        return;
      }
      this.context.beginPath();
      this.context.moveTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.lineTo(this.lastPlace.x1, this.lastPlace.y1);
      x2 = x + (this.tip.height * Math.sin(rotation));
      y2 = y + (this.tip.height * Math.cos(rotation));
      this.context.lineTo(x, y);
      this.context.lineTo(x2, y2);
      this.context.lineTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.fill();
      this.lastPlace.x1 = x;
      this.lastPlace.y1 = y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
    };

    return Pen;

  })();

}).call(this);

(function() {
  var canvas;

  window.TO_RAD = Math.PI / 180;

  window.TO_DEG = 1 / TO_RAD;

  window.controller = new Leap.Controller;

  controller.connect().use('riggedHand', {}).on('hand', function(hand) {
    var handMesh, pen, screenPosition;
    handMesh = hand.data('riggedHand.mesh');
    screenPosition = handMesh.screenPosition(hand.indexFinger.tipPosition, controller.plugins.riggedHand.camera);
    pen = hand.data('pen');
    if (!pen) {
      pen = hand.data('pen', new Pen({
        context: canvas.getContext('2d')
      }));
    }
    return pen.stroke(screenPosition.x, window.innerHeight - screenPosition.y, hand.roll());
  });

  canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

}).call(this);
