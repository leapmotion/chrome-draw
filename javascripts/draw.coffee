# simulate caligraphy
class window.Draw

  @context: null

  # a rectangle
  @brush: {
    width: 10
    height: 40
  }

  @lastPlace: {
    x1: null,
    y1: null
    x2: null,
    y2: null
  }

  # expects rotation in radians
  @place: (x, y, rotation)->
    console.log 'point', arguments
    @context.beginPath()
    @context.moveTo(x, y)
    @context.lineTo(
        # not sure what happens at angles > 1 quadrant
        x + (@brush.height * Math.sin(rotation)),
        y + (@brush.height * Math.cos(rotation))
      )
    @context.stroke()



  @stroke: ->
    console.log 'connect'

