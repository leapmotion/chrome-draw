window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

window.context       = setupContext('canvas')
window.cursorContext = setupContext('cursorCanvas')
window.Canvas.context = window.context

# leap-enable the drawing
(window.controller = new Leap.Controller)
controller
  .connect()
  .use('riggedHand', {})
  .use('handSplay')
  .use('relativeMotion')
  .on 'frame', (frame) ->
    # remove mouse cursors from previous frame
    cursorContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  .on 'hand', (hand)->
    pen = getPen(hand)

    if hand.pinchStrength < 0.5
      pen.updateCursor()
    else
      pen.stroke()


Controls.initialize(controller)


