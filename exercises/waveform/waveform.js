/**
 * A view of a waveform.
 */
(function () {
  "use strict";

  var UNPLAYED_COLOR = '#333';
  var PLAYED_COLOR   = '#f60';

  function Waveform (options) {
    this.sound = options.sound;
    this.canvas = options.canvas;

    this.sound.on('timeUpdate', this.update, this);

    // Cached properties
    this._lastSound  = null;
    this._lastHeight = null;
    this._lastWidth  = null;
    this._lastParts  = null;
    this._lastIndex  = null;
  }

  SC.Waveform = Waveform;

  _.extend(Waveform.prototype, SC.Events, {
    /*
     * Let the user seek through the track
     */
    scrubTrack: function(ev) {
      var width, time;

      width = $(this.canvas).width();
      time  = (ev.offsetX / width) * this.sound.duration;

      this.sound.seek(time);
    },

    /**
     * Draw the canvas the first time. This is called once only, and before any calls to `update()`.
     */
    render: function () {
      this.update();
      $(this.canvas).on('click', this.scrubTrack.bind(this));
    },

    /**
     * Update the visual state of the waveform so that it accurately represents the play progress of its sound.
     */
    update: function() {
      var height, width, $canvas, updates, parts, index, ctx;

      $canvas = $(this.canvas);
      width   = $canvas.width();
      height  = $canvas.height();
      parts   = this._lastParts;
      ctx     = this.canvas.getContext('2d');

      // Invalidate the cache if the sound or player dimensions have changed
      if (this.sound !== this._lastSound) {
        parts = null;
      }

      if (this._lastWidth !== width || this._lastHeight !== height) {
        parts = null;
      }

      // Calculate the parts if necessary
      if (this._lastParts === null) {
        parts = Waveform.parts(
          { height:height, width:width },
          this.sound.waveformData
        );
      }

      // Calculate where we are up to
      index = Waveform.currentPart(parts, this.sound.currentTime, this.sound.duration);

      // Determine the required updates
      updates = Waveform.changedParts(parts, this._lastIndex, index);

      // Perform the updates
      if (this._lastParts === null) {
        ctx.clearRect(0, 0, Infinity, Infinity);
      }

      _.each(updates, function(rect) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
      });

      // Store the values for next time
      this._lastSound  = this.sound;
      this._lastHeight = height;
      this._lastWidth  = width;
      this._lastIndex  = index;
      this._lastParts  = parts;
    },

    /* Old Update */
    _old_update: function () {
      var data = this.sound.waveformData,
          ctx = this.canvas.getContext('2d');

      ctx.clearRect(0, 0, Infinity, Infinity);

      for (var x = 0; x < this.canvas.offsetWidth; x++) {

        var sampleInd = Math.floor(x * data.width / $(this.canvas).width()),
            value     = Math.floor($(this.canvas).height() * data.samples[sampleInd] / data.height / 2),
            width     = $(this.canvas).width(),
            height    = $(this.canvas).height();

        for (var y = value; y < height - value; y++) {
          ctx.fillStyle = x < this.sound.currentTime / this.sound.duration * width ? '#f60' : '#333';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });

  /**
   * Static waveform methods
   */

  // Calculate all the rectangles for a sound within a canvas
  // :: {num, num} -> {num, num, [num]} -> [{num, num, num, num}]
  Waveform.parts = function(box, data) {
    var rects = [];

    for (var x = 0; x < box.width; x++) {
      var index  = Math.floor(x * data.width / box.width),
          value  = Math.floor(box.height * data.samples[index] / data.height / 2);

      rects.push({
        x: x,
        width: 1,
        y: value,
        height: ((box.height / 2) - value) * 2,
      });
    }

    return rects;
  };

  // Calcuates the index of the part that the playback has reached
  // :: [{num, num, num, num}] -> num -> num -> num
  Waveform.currentPart = function(parts, currentTime, duration) {
    if (currentTime > 0) {
      return Math.round(parts.length * (currentTime / duration));
    }
    else {
      return 0;
    }
  };

  // Calculates the parts which should be re-rendered (with the correct color)
  // :: [{num, num, num, num}] -> Maybe(num) -> num -> [{num, num, num, num, string}]
  Waveform.changedParts = function(parts, prevIndex, currentIndex) {
    var changes;

    // No changes if the index hasn't changed
    if (prevIndex === currentIndex) {
      return [];
    }

    // If there was no previous index then everything has changed
    if (prevIndex === null) {
      changes = parts;
    }
    // Otherwise the changes are just whatever was between the two points
    else {
      changes = parts.slice(
        Math.min(prevIndex, currentIndex),
        Math.max(prevIndex, currentIndex)
      );
    }

    // Calculate what color each rectangle should be
    return _.map(changes, function(rect, index) {
      return {
        x      : rect.x,
        y      : rect.y,
        height : rect.height,
        width  : rect.width,
        color  : (index + (prevIndex || 0)) >= currentIndex ? UNPLAYED_COLOR : PLAYED_COLOR
      };
    });
  };

}());
