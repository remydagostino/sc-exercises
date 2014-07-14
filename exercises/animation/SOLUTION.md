## Initial Thoughts

Animating between two almost completely different screens is always tricky.

The first tempation is always to just do a crossfade because it is so easy. I wanted to use movement instead because I was concerned that a crossfade affords no concept of precedence in the UI.

Primarily I wanted the animation to capture the relationships between the layers of the interface. I decided what these layers were and then tried to create some phrases to describe how they move.

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

Building complex 'choreographed' animations in plain CSS can be really painful. I would usually use a javascript animation library or a css preprocessor to take some of the repetition out of the task. In any case I opted to do the entire thing using CSS keyframes using a single class on the root element to control the animation. I also avoided using explicit delays in the animations because I think it is easier to reason about the the different keyframe animations when they are all exactly the same length.

Some of the repetition in the styles could be avoided by using `animation-fill-mode` set to `forward`. Indeed, that is probably what I would use in production code where the animation only needed to flow foward. For this prototype I found it fun to play the animation forward and backward so I chose to implement the final state of the animation as a separate "finished animating" class instead.


### Browser Compatability

The transition from the large text of the artist name in the cover mode to the small text of the 'play' mode is a bit janky in webkit browsers. It looks much nicer in Firefox; though I'd assume that we wouldn't go live with an animation with a glitch that affected more than half our user base. Nevertheless, I really liked the idea so I've left it in for the time being. Perhaps there is some neat webkit hack that I've forgotten that could tidy up the text transition, otherwise I'd probably just use a different animation for that part.


## Notes

- No back/pause/stop button existed in the designs. I just made it so that clicking in the middle of the player (where the button used to be) reverses the animation (for fun).
- I ran my css through autoprefixer. There is a more consice unprefixed version in `style-pre.css`.


