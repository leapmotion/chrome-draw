window.TO_RAD = Math.PI / 180;
window.TO_DEG = 1 / TO_RAD;


(window.controller = new Leap.Controller)
controller
  .connect()
  .use('riggedHand', {})
  .on 'hand', (hand)->
    console.log('h')


canvas = document.getElementById("canvas")

Draw.context = canvas.getContext("2d")

Draw.place(10,10, 25 * TO_RAD)