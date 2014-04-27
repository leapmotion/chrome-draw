window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


(window.controller = new Leap.Controller)
controller
  .connect()
  .use('riggedHand', {})
  .on 'hand', (hand)->

    return if hand.pinchStrength < 0.5

    # set up rigged hand:
    handMesh = hand.data('riggedHand.mesh')

    screenPosition = handMesh.screenPosition(
      hand.indexFinger.tipPosition,
      controller.plugins.riggedHand.camera
    )


    # set up pen
    pen = hand.data('pen')

    unless pen
      pen = hand.data('pen', new Pen(context: canvas.getContext('2d')))


    pen.stroke(screenPosition.x, window.innerHeight - screenPosition.y, hand.roll())




canvas = document.getElementById("canvas")
# prevent up-scale
canvas.width = window.innerWidth
canvas.height = window.innerHeight

