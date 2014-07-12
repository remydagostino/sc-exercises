## Problems

These problems are immediately evident.

1. The canvas' width and height is being repeatedly evaluated inside the first for loop
2. The update function is just being called whenever, not waiting for the next animation frame.
3. None of the calculations are being cached.

The current implementation is completely stateless (how admirable) but the price for that simplicity is too high.

## Solution

Calculate all of the waveform rectanges on the first update.

Determine the position of the track, returning the number of black rectangles vs the number of orange ones. Then do a diff between the current state and the new state and update just the rectangles that have changed.

If the width or height has changed between two consecutive updates, then all cached data needs to be discarded.

This solution is performant because the amount of redrawing between consective renders is likely to be very minor (even when scrubbing).

