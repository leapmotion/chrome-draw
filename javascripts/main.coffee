window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;

window.context       = setupContext('canvas')
window.cursorContext = setupContext('cursorCanvas')
window.Canvas.context = window.context

# leap-enable the drawing
(window.controller = new Leap.Controller({enableGestures: true}))
controller
  .connect()
  .use('riggedHand', {
    boneColors: (boneMesh, leapHand)->
      # todo: better pen default handling, better saturation default.

#      console.log('splay', leapHand.data('handSplay.splay'))
      splay = leapHand.data('handSplay.splay');
      document.getElementById('out2').innerHTML = splay;

      pen = leapHand.data('pen')
      if pen
        hue = pen.hue / 360
        if leapHand.data('handSplay.splayed')
          {
            hue: hue
            saturation: 0.5
          }
        else
          {
            hue: hue
            saturation: Math.max(leapHand.data('handSplay.splay') - 0.5, 0)
          }
      else
        {
          hue: 0
          saturation: 0.1
        }



  })
  .use('handSplay', {
    splayThreshold: 0.75
  })
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

#  .on 'gesture', (circle)->
#    if circle.state == 'stop'
#      console.log 'circle', circle.state, circle.duration / 1000


Controls.initialize(controller)


