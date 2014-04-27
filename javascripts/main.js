(function() {
  window.Pen = (function() {
    function Pen(options) {
      if (options == null) {
        options = {};
      }
      this.context = options.context;
      this.cursorContext = options.cursorContext;
      this.previewMode = false;
      this.contexts = [options.context, options.cursorContext];
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

    Pen.prototype.setPosition = function(x, y, rotation) {
      this.x = x;
      this.y = y;
      return this.rotation = rotation;
    };

    Pen.prototype.setColor = function(colorString) {
      return this.contexts.map(function(context) {
        return context.strokeStyle = context.fillStyle = colorString;
      });
    };

    Pen.prototype.hasPreviousPlace = function() {
      return this.lastPlace.x1 && this.lastPlace.x2 && this.lastPlace.y1 && this.lastPlace.y2;
    };

    Pen.prototype.place = function(context) {
      var x2, y2;
      context.beginPath();
      context.moveTo(this.x, this.y);
      x2 = this.x + (this.tip.height * Math.sin(this.rotation));
      y2 = this.y + (this.tip.height * Math.cos(this.rotation));
      context.lineTo(this.x, this.y);
      context.lineTo(x2, y2);
      context.stroke();
      this.lastPlace.x1 = this.x;
      this.lastPlace.y1 = this.y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
    };

    Pen.prototype.stroke = function() {
      var x2, y2;
      this.previewMode = false;
      if (!this.hasPreviousPlace()) {
        this.place(this.context);
        return;
      }
      this.context.beginPath();
      this.context.moveTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.lineTo(this.lastPlace.x1, this.lastPlace.y1);
      x2 = this.x + (this.tip.height * Math.sin(this.rotation));
      y2 = this.y + (this.tip.height * Math.cos(this.rotation));
      this.context.lineTo(this.x, this.y);
      this.context.lineTo(x2, y2);
      this.context.lineTo(this.lastPlace.x2, this.lastPlace.y2);
      this.context.fill();
      this.lastPlace.x1 = this.x;
      this.lastPlace.y1 = this.y;
      this.lastPlace.x2 = x2;
      return this.lastPlace.y2 = y2;
    };

    Pen.prototype.updateCursor = function() {
      return this.place(this.cursorContext);
    };

    return Pen;

  })();

}).call(this);

(function() {
  var context, cursorContext, getPen, setupContext;

  window.TO_RAD = Math.PI / 180;

  window.TO_DEG = 1 / TO_RAD;

  setupContext = function(id) {
    var canvas;
    canvas = document.getElementById(id);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas.getContext('2d');
  };

  context = setupContext('canvas');

  cursorContext = setupContext('cursorCanvas');

  window.controller = new Leap.Controller;

  controller.connect().use('riggedHand', {}).on('frame', function(frame) {
    return cursorContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }).on('hand', function(hand) {
    var pen;
    pen = getPen(hand);
    if (hand.pinchStrength < 0.5) {
      return pen.updateCursor();
    } else {
      return pen.stroke();
    }
  });

  getPen = function(hand) {
    var angle, handMesh, pen, screenPosition;
    handMesh = hand.data('riggedHand.mesh');
    screenPosition = handMesh.screenPosition(hand.indexFinger.tipPosition, controller.plugins.riggedHand.camera);
    pen = hand.data('pen');
    if (!pen) {
      pen = hand.data('pen', new Pen({
        context: context,
        cursorContext: cursorContext
      }));
    }
    angle = Leap.vec3.create();
    Leap.vec3.sub(angle, hand.indexFinger.tipPosition, hand.thumb.tipPosition);
    Leap.vec3.normalize(angle, angle);
    document.getElementById('out').innerHTML = hand.pinchStrength;
    pen.setPosition(screenPosition.x, window.innerHeight - screenPosition.y, hand.roll());
    pen.setColor("rgba(255,0,0," + hand.pinchStrength + ")");
    return pen;
  };

}).call(this);
