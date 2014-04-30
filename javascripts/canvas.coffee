class window.Canvas
  @history = []
  @swipedAt = null

  @saveState: ->
#    @history.push @context.getImageData(0,0,context.width, context.height)
    @history.push @context.getImageData(0,0,window.innerWidth, window.innerHeight)

  @restoreState: ->
    return unless @history.length > 0

    @context.putImageData(@history.pop(), 0, 0)

  @reset: ->
    return unless @history.length > 0
    @context.putImageData(@history[0], 0, 0)
    @history = []


  @handleSwipe: (swipe)->
    swipedAt = (new Date).getTime()
    return if @swipedAt && @swipedAt > (swipedAt - 1000)

    if swipe.direction[0] > 0 || (Math.abs(swipe.direction[0]) < (Math.abs(swipe.direction[1]) + Math.abs(swipe.direction[2])))
      console.log 'incorrect direction, no swipe'
      return

    @swipedAt = swipedAt

    console.log 'swipe', swipe.direction
    @reset()