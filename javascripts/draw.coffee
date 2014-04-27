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

  @hasPreviousPlace: ->
    @lastPlace.x1 && @lastPlace.x2 && @lastPlace.y1 && @lastPlace.y2

  # expects rotation in radians
  @place: (x, y, rotation)->
    @context.beginPath()
    @context.moveTo(x, y)

    x2 = x + (@brush.height * Math.sin(rotation))
    y2 = y + (@brush.height * Math.cos(rotation))
    @context.lineTo(x,y)
    @context.lineTo(x2, y2)

    @context.stroke()
    @lastPlace.x1 = x
    @lastPlace.y1 = y
    @lastPlace.x2 = x2
    @lastPlace.y2 = y2



  @stroke: (x,y,rotation)->
    unless @hasPreviousPlace()
      @place(x,y,rotation)
      return

    console.log 'connect'
    @context.beginPath()
    @context.moveTo(@lastPlace.x2, @lastPlace.y2)
    @context.lineTo(@lastPlace.x1, @lastPlace.y1)

    x2 = x + (@brush.height * Math.sin(rotation))
    y2 = y + (@brush.height * Math.cos(rotation))
    @context.lineTo(x,y)
    @context.lineTo(x2, y2)

    @context.lineTo(@lastPlace.x2, @lastPlace.y2)
    @context.fill()

    @lastPlace.x1 = x
    @lastPlace.y1 = y
    @lastPlace.x2 = x2
    @lastPlace.y2 = y2

