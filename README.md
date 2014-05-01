# Chrome Draw

Welcome to chrome draw.  This is a drawing app built to be turned in to a chrome extension to mark up any web page.

## Demo:

Requires WebGL for display, Leap Skeletal Beta for interaction:

[leapmotion.github.io/chrome-draw/](http://leapmotion.github.io/chrome-draw/)

## Building

It is currently implemented in coffee script.  To compile your own changes, make sure you have grunt installed
(`npm install grunt`), and then simply run

```bash
> grunt watch
```

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


## Components

 - The [Rigged Hand](https://github.com/leapmotion/leapjs-rigged-hand) - 3d hand on screen
 - [Leapjs-playback](https://github.com/leapmotion/leapjs-playback) - plays back pre-recorded motion
 - *leap.relative-motion* This beta plugin allows motion relative to the position of the hand when last recalibrated
 - *leap.hand-splay* This beta plugin measures how flat and stretched-out a hand is.
