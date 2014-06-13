# Chrome Draw

Welcome to chrome draw.  This is a drawing app built to be turned in to a chrome extension to mark up any web page.

## Demo:

Requires WebGL for display, Leap Skeletal Beta for interaction:

[leapmotion.github.io/chrome-draw/](http://leapmotion.github.io/chrome-draw/)

## Building

It is currently implemented in coffee script.  Simply run

> npm install

> grunt dev

And then head to http://localhost:8000

As well as transpiling the coffeescript in to `main.js`, this will also run a livereload server.  With the right
[chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en), the page will reload for you when files are changed.

## Known issues and road map

 - Hand splay should be measuring how stretched-out fingers are, but actually measures how together they are
 - Sometimes some brush strokes are left behind when clearing the canvas
 - Leap-playback can sometimes speed up

**Roadmap**:

 - Wire up the color choosers on the top right
 - Allow click interaction, to go between moving hand Up/Down for hue and Up/Down/Left/Right for saturation
 - Build in to chrome extension, for use on any page
 - Add "new canvas" and "take screenshot" buttons
 - Add share buttons
 - Break out swipe-timeout (and direction, end-event) in to their own wrapper plugin
 - Add field of view calculations (plugin) and a feature with the rigged hand to allow coloring bounded by a plane.  Use to darken the hand on the edge of the field of view.
 - Use radial coordinate system to detect left and right flicks of the hand from the wrist, use to switch h/s/l setting modes.
 - Add grab support, to allow moving the background with one hand, while drawing with the other.


## Components

 - Probably the most interesting part of the app is how the pen is positioned: [javascripts/helpers.coffee#L41-L45](https://github.com/leapmotion/chrome-draw/blob/master/javascripts/helpers.coffee#L41-L45)
 - The [Rigged Hand](https://github.com/leapmotion/leapjs-rigged-hand) - 3d hand on screen
 - [Leapjs-playback](https://github.com/leapmotion/leapjs-playback) - plays back pre-recorded motion
 - *leap.relative-motion* This beta plugin allows motion relative to the position of the hand when last recalibrated
 - *leap.hand-splay* This beta plugin measures how flat and stretched-out a hand is.
