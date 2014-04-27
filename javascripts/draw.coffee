# simulate caligraphy
class window.Pen

  constructor: (options = {})->
    @context = options.context
    @cursorContext = options.cursorContext
    @previewMode = false

    # a rectangle
    @tip = {
      width: 10
      height: 40
    }

    @lastPlace = {
      x1: null
      y1: null
      x2: null
      y2: null
    }

  setPosition: (x,y,rotation)->
    @x = x
    @y = y
    @rotation = rotation

  hasPreviousPlace: ->
    @lastPlace.x1 && @lastPlace.x2 && @lastPlace.y1 && @lastPlace.y2

  # expects rotation in radians
  place: (context)->
    context.beginPath()
    context.moveTo(@x, @y)

    x2 = @x + (@tip.height * Math.sin(@rotation))
    y2 = @y + (@tip.height * Math.cos(@rotation))
    context.lineTo(@x,@y)
    context.lineTo(x2, y2)

    context.stroke()
    @lastPlace.x1 = @x
    @lastPlace.y1 = @y
    @lastPlace.x2 = x2
    @lastPlace.y2 = y2


  stroke: ->
    @previewMode = false
    unless @hasPreviousPlace()
      @place(@context)
      return

    @context.beginPath()
    @context.moveTo(@lastPlace.x2, @lastPlace.y2)
    @context.lineTo(@lastPlace.x1, @lastPlace.y1)

    x2 = @x + (@tip.height * Math.sin(@rotation))
    y2 = @y + (@tip.height * Math.cos(@rotation))
    @context.lineTo(@x,@y)
    @context.lineTo(x2, y2)

    @context.lineTo(@lastPlace.x2, @lastPlace.y2)
    @context.fill()

    @lastPlace.x1 = @x
    @lastPlace.y1 = @y
    @lastPlace.x2 = x2
    @lastPlace.y2 = y2

  updateCursor: ->
    @place(@cursorContext)




