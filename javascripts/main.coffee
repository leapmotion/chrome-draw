window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


(window.controller = new Leap.Controller)
controller
  .connect()
  .use('riggedHand', {})
  .on 'hand', (hand)->
    handMesh = hand.data('riggedHand.mesh')

    screenPosition = handMesh.screenPosition(
      hand.indexFinger.tipPosition,
      controller.plugins.riggedHand.camera
    )

    Draw.stroke(screenPosition.x, window.innerHeight - screenPosition.y, hand.roll())




canvas = document.getElementById("canvas")
#canvas.width(($(window).width()).height($(window).height());
canvas.width = window.innerWidth
canvas.height = window.innerHeight


Draw.context = canvas.getContext("2d")

Draw.place(100,100, 0 * TO_RAD)
Draw.place(110,100, 10 * TO_RAD)
Draw.stroke(260,100, -5 * TO_RAD)