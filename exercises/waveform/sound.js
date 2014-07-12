/**
 * This is a model which pretends to play a sound. In reality, it merely emits `timeUpdate` events while "playing".
 * It additionally provides a `seek` method to skip within the sound.
 *
 * These events can be listened to by using `sound.on('timeUpdate', {{handler}})`.
 *
 * Though the code below is not pretty, **it should not be necessary to modify its contents**.
 */
(function () {
  function Sound (attrs) {
    this.duration = attrs.duration || 0;
    this.waveformData = attrs.waveformData || {};
  }

  SC.Sound = Sound;

  _.extend(Sound.prototype, SC.Events, {
    /**
     * The current playback position of this sound, in milliseconds.
     * @type {Number}
     */
    currentTime: 0,

    /**
     * The total duration of this sound, in milliseconds.
     * @type {Number}
     */
    duration: 0,

    /**
     * I am completely aware that this method is garbage, however it works for our purposes.
     *
     * A 'timeUpdate' event will be emitted after seeking.
     *
     * @param {Number} time  A timestamp to seek to (in milliseconds)
     */
    seek: function seek (time) {
      var wasPlaying = this._isPlaying;

      if (wasPlaying) {
        this.toggle();
      }

      this.currentTime = time;

      if (wasPlaying) {
        this.toggle();
      }
      this.trigger('timeUpdate');
    },

    /**
     * Toggle this Sound between play and pause state.
     *
     * Since this is merely a dummy model, it doesn't handle any special cases (eg: reaching the end of the track).
     * Again, this is okay for the purposes of this challenge.
     */
    toggle: function toggle () {
      var playStartTime, startTime;

      if (this._isPlaying) {
        this._isPlaying = false;
        clearInterval(this._timer);
      } else {
        this._isPlaying = true;
        playStartTime = this.currentTime;
        startTime = Date.now();
        this._timer = setInterval(function (self) {
          self.currentTime = playStartTime + Date.now() - startTime;
          self.trigger('timeUpdate');
          if (self.currentTime >= self.duration) {
            self.toggle();
          }
        }, 10, this);
      }
    }
  });

}());
