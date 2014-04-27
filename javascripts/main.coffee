window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


setupContext = (id)->
  canvas = document.getElementById(id)
  # prevent up-scale
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  return canvas.getContext('2d')


context       = setupContext('canvas')
cursorContext = setupContext('cursorCanvas')

(window.controller = new Leap.Controller)
controller
  .connect()
  .use('riggedHand', {})
  .on 'frame', (frame) ->
    # remove mouse cursors from previous frame
    cursorContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  .on 'hand', (hand)->
    pen = getPen(hand)

    if hand.pinchStrength < 0.5
      pen.updateCursor()
    else
      pen.stroke()


getPen = (hand)->
  # set up rigged hand:
  handMesh = hand.data('riggedHand.mesh')

  screenPosition = handMesh.screenPosition(
    hand.indexFinger.tipPosition,
    controller.plugins.riggedHand.camera
  )

  # set up pen
  pen = hand.data('pen')

  unless pen
    pen = hand.data('pen', new Pen(
        context: context
        cursorContext: cursorContext
      )
    )

  # weird, angle between thumb and indexFinger doesn't seem to work.
  angle = Leap.vec3.create()
  Leap.vec3.sub(angle, hand.indexFinger.tipPosition, hand.thumb.tipPosition)
  Leap.vec3.normalize(angle, angle)

  document.getElementById('out').innerHTML = (Math.tan(angle[0], angle[1]) * TO_DEG).toPrecision(2) + '&#176;'


  pen.setPosition(
    screenPosition.x,
    window.innerHeight - screenPosition.y,
    hand.roll()
  )

  return pen




