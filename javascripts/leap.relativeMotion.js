Leap.plugin('relativeMotion', function(scope){
  scope || (scope = {});

  var zeroPosition = [0,0,0];

  scope.defaultPosition = [0,0,0];
  scope.defaultUp = [0,1,0];

  this.use('handHold');


  // expects normalized vectors from and to
  // this method is kind of dumb
  // it can be done without Math.cos at all, that is a sign that something is wonky
  // http://lolengine.net/blog/2013/09/18/beautiful-maths-quaternion-from-vectors
  var rotationMatrixFromVectors = function(from, to){
    var axis = Leap.vec3.create();
    Leap.vec3.cross(axis, from, to);

    var rad = Math.acos(Leap.vec3.dot(from, to));

    var rotationMatrix = Leap.glMatrix.mat4.create();
    Leap.glMatrix.mat4.rotate(rotationMatrix, rotationMatrix, rad, axis);
  };

  return {
    hand: {


      // resets the local frame of reference to the hand's current position and orientation
      recalibrate: function(){
        this.data('relativeMotion.position', this.palmPosition);

        var up = Leap.vec3.create();
        Leap.vec3.scale(up, this.palmNormal, -1);
        this.data('relativeMotion.up', up);

        // we create the rotation matrix from our new up to the old one
        // this is the direction it will be applied later to get correct displacements
        this.data('relativeMotion.rotationMatrix', rotationMatrixFromVectors( up, [0,1,0] ) );
      },



      // Gets the translation since last recalibration
      // Translation x, y, and z are oriented with hand when it was recalibrated
      relativePosition: function(){

        // in absolute Leap coordinate system
        var zeroPosition = this.data('relativeMotion.position', {
          default: scope.defaultPosition
        });

        var positionDelta = Leap.vec3.create();
        Leap.vec3.sub(positionDelta, this.palmPosition, zeroPosition);

        var rotationMatrix = this.data('relativeMotion.rotationMatrix', {
          default: Leap.glMatrix.mat4.create()
        });

        Leap.vec3.transformMat4(positionDelta, positionDelta, rotationMatrix);

        return positionDelta;
      }//,



//      relativeRotation: function(){
//
//        var up = this.data('relativeMotion.up', {
//          default: scope.defaultUp
//        })
//      }


    }
  }

});