class window.Canvas
  @history = []

  @saveState: ->
#    @history.push @context.getImageData(0,0,context.width, context.height)
    @history.push @context.getImageData(0,0,window.innerWidth, window.innerHeight)

  @restoreState: ->
    return unless @history.length > 0

    @context.putImageData(@history.pop(), 0, 0)