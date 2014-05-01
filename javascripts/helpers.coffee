# helper methods used when setting up the page

# creates a canvas for drawing
window.setupContext = (id)->
  canvas = document.getElementById(id)
  # prevent up-scale
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  return canvas.getContext('2d')

# gets the pen of a hand, pre-configured according to leap-data
window.getPen = (hand)->
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

#  document.getElementById('out').innerHTML = (Math.tan(angle[0], angle[1]) * TO_DEG).toPrecision(2) + '&#176;'
#  document.getElementById('out').innerHTML = hand.pinchStrength
  document.getElementById('out').innerHTML = "Splayed: #{hand.data('handSplay.splayed')}"


  pen.setPosition(
    screenPosition.x,
    window.innerHeight - screenPosition.y,
    hand.roll()
  )

  pen.setColor("hsla(#{pen.hue}, 50%, 45%, #{hand.pinchStrength})")

  return pen




