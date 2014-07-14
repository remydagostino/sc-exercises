## Problems

These problems were immediately evident.

1. The canvas' width and height is being repeatedly evaluated inside the first `for` loop
2. The entire canvas is redrawn every time the sound updates, even if there would be no visual changes.
3. Each bar is being rendered one pixel at a time

The current implementation is completely stateless (how admirable) but the price for that simplicity is too high.

## Profiling the problem

Chrome's debugger showed that the problem is almost entirely the javascript execution time. A quick look at the timeline showed that over 1400% more time is spent running calculations in 'Timer Fired' than is spent in 'paint' and 'composite layers'.

## Solution

Calculate all of the waveform rectanges on the first update.

Determine the position of the track, returning the number of black rectangles vs the number of orange ones. Then do a diff between the current state and the new state and update just the rectangles that have changed.

If the width or height has changed between two consecutive updates, then all cached data needs to be discarded.

This solution is performant because the amount of redrawing between consective renders is likely to be very minor (even when scrubbing).

Inspecting the profile of the application in chrome shows very significant improvements:
- Multiple consective renders don't make it to painting unless changes are actually required
- Each 'Timer Fired' event executes in less than a millisecond (down from 150 - 200 milliseconds)
- Process idle time improved to 87% from 0.6%
