class window.Controls

  # can be one of color, hue, or null
  # later, could add senstivity
  mode = 'hue'
  hsl = []


  @initialize: (controller)->
    @setupEvents(controller)

    $("#color").spectrum({
      flat: true,
      showButtons: false
    });

    $('.sp-color').on 'click', ()->
      $(this).addClass('active')
      mode = 'color'

    $('.sp-hue').on 'click', ()->
      $(this).addClass('active')
      mode = 'hue'

    $(document.body).on 'click', ->


  @setupEvents = (controller)->

    controller.on 'handSplay', (hand)->
      console.log 'hand splay'
      hand.recalibrate()

    controller.on 'handUnsplay', (hand)->
      console.log 'hand unsplay'

    controller.on 'hand', (hand)=>
      return unless hand.data('handSplay.splayed')

      relativeScreenPosition = @screenPosition(hand.relativePosition());

      # early-exit if no change
      if previousRelativeScreenPosition &&
        relativeScreenPosition.left == previousRelativeScreenPosition.left &&
                relativeScreenPosition.top == previousRelativeScreenPosition.top
        return

      previousRelativeScreenPosition = relativeScreenPosition

      hand.data('pen').changeHue(relativeScreenPosition.top)
      hand.recalibrate()


#      $("#color").spectrum

  # this method creates an object every frame, which isin't great
  @screenPosition = (vec3)->
    factor = 1 # pixels per mm

    if mode == 'hue'
      # we only care about the vertical dimension, y
      {
        left: 0,
        top: vec3[1] * factor
      }
    else if mode == 'color'
      # include both x and y
      {
        left: vec3[1] * factor,
        top: vec3[1] * factor
      }

