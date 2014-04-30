(function() {
  window.Canvas = (function() {
    function Canvas() {}

    Canvas.history = [];

    Canvas.saveState = function() {
      return this.history.push(this.context.getImageData(0, 0, window.innerWidth, window.innerHeight));
    };

    Canvas.restoreState = function() {
      if (!(this.history.length > 0)) {
        return;
      }
      return this.context.putImageData(this.history.pop(), 0, 0);
    };

    return Canvas;

  })();

}).call(this);

(function() {
  window.Controls = (function() {
    var hsl, mode;

    function Controls() {}

    mode = null;

    hsl = [];

    Controls.initialize = function(controller) {
      this.setupEvents(controller);
      $("#color").spectrum({
        flat: true,
        showButtons: false
      });
      $('.sp-color').on('click', function() {
        $(this).addClass('active');
        return mode = 'color';
      });
      $('.sp-hue').on('click', function() {
        $(this).addClass('active');
        return mode = 'hue';
      });
      return $(document.body).on('click', function() {});
    };

    Controls.setupEvents = function(controller) {
      return;
      controller.on('handSplay', function(hand) {
        console.log('hand splay');
        return hand.recalibrate();
      });
      return controller.on('hand', (function(_this) {
        return function(hand) {
          var previousRelativeScreenPosition, relativeScreenPosition;
          if (!hand.data('handSplay.splayed')) {
            return;
          }
          relativeScreenPosition = _this.screenPosition(hand.relativePosition());
          if (relativeScreenPosition.left === previousRelativeScreenPosition.left && relativeScreenPosition.top === previousRelativeScreenPosition.top) {
            return;
          }
          previousRelativeScreenPosition = relativeScreenPosition;
          return $("#color").spectrum;
        };
      })(this));
    };

    Controls.screenPosition = function(vec3) {
      var factor;
      factor = 1;
      if (mode === 'hue') {
        return {
          left: 0,
          top: vec3[1] * factor
        };
      } else if (mode === 'color') {
        return {
          left: vec3[1] * factor,
          top: vec3[1] * factor
        };
      }
    };

    return Controls;

  })();

}).call(this);

(function() {
  window.setupContext = function(id) {
    var canvas;
    canvas = document.getElementById(id);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    return canvas.getContext('2d');
  };

  window.getPen = function(hand) {
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
    document.getElementById('out').innerHTML = hand.data('handSplay.splayed');
    pen.setPosition(screenPosition.x, window.innerHeight - screenPosition.y, hand.roll());
    pen.setColor("rgba(255,0,0," + hand.pinchStrength + ")");
    return pen;
  };

}).call(this);

(function() {
  window.TO_RAD = Math.PI / 180;

  window.TO_DEG = 1 / TO_RAD;

  window.context = setupContext('canvas');

  window.cursorContext = setupContext('cursorCanvas');

  window.Canvas.context = window.context;

  window.controller = new Leap.Controller;

  controller.connect().use('riggedHand', {}).use('handSplay').use('relativeMotion').on('frame', function(frame) {
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

  Controls.initialize(controller);

}).call(this);

(function() {
  window.Pen = (function() {
    function Pen(options) {
      if (options == null) {
        options = {};
      }
      this.context = options.context;
      this.cursorContext = options.cursorContext;
      this.contexts = [options.context, options.cursorContext];
      this.drawing = false;
      this.tip = {
        height: 10
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

    Pen.prototype.setOpacity = function(fraction) {
      var colorString;
      colorString = context.fillStyle;
      colorString = colorString.split(',');
      colorString[3] = "" + fraction + ")";
      return this.setColor(colorString.join(','));
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
      if (!this.hasPreviousPlace()) {
        this.place(this.context);
        return;
      }
      if (!this.drawing) {
        window.Canvas.saveState();
      }
      this.drawing = true;
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
      this.drawing = false;
      return this.place(this.cursorContext);
    };

    return Pen;

  })();

}).call(this);
