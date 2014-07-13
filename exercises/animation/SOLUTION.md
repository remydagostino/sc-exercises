## Initial Thoughts

Animating between two almost completely different screens is always tricky.

The first tempation is always to just do a crossfade because it is so easy. I wanted to use movement rather than a crossfade because it affords no concept of precedence in the UI.

Primarily I wanted the animation to capture the relationships between the layers of the interface. I decided what these layers were and then tried to create some phrases to describe out they move.

- The cover: *move out of the way* to reveal the track
- The track: *step into the forefront* when it is played
- The artist name: *shrink into the background*
- The track name: *slide from the future into the present*. If an embed had multiple tracks there would need to be some way to show which one was active at the current time.
- The waveform: *take the stage*. This is the only part of the UI that keeps moving after the track begins, I felt like it should be separate.
- The play button: *fade away*. The play button isn't important once it's pressed. It should just disappear.

## Concerns

The UI for the playback screen doesn't show a pause or back button - I thought that was odd. One of the included assets was a pause button but I didn't know where it was supposed to go.

The font "Interstate Light" was provided but I couldn't see where it was used in the interface. I tried measuring the text in the designs but it seemed like everything was just the regular weight.

## Outcomes

Building complex 'coreographed' animations in plan CSS can be really painful.I would usually use a javascript animation library or a css preprocessor to take some of the repetition out of the task. In any case I opted to do the entire thing using CSS keyframes using a single class on the root element to control the animation. I also avoided using explicit delays in the animations because I think it is easier to reason about the all the different keyframe animations when they are all exactly the same length.

I had this idea that I could just slide the cover up and out while moving the artist name to the top-left of the screen but it didn't turn out quite how I imagined. The artist location "Lancaster, Britain UK" looked like it was racing against the artist name and it wasn't clear that they were on separate layers. I tried adding a small 3d rotation to the cover as it moved up and I think that may have fixed the problem.

## Notes

- No back/pause/stop button existed in the designs. I just made it so that clicking in the middle of the player (where the button used to be) reverses the animation.
- I ran my css through autoprefixer. There is a more consice webkit only version in `style-wk.css`.


