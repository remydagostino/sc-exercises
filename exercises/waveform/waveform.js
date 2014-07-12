/**
 * A view of a waveform.
 */
(function () {

  function Waveform (options) {
    this.sound = options.sound;
    this.canvas = options.canvas;

    this.sound.on('timeUpdate', this.update, this);
  }

  SC.Waveform = Waveform;

  _.extend(Waveform.prototype, SC.Events, {

    /**
     * Draw the canvas the first time. This is called once only, and before any calls to `update()`.
     */
    render: function () {
      this.update();
    },

    /**
     * Update the visual state of the waveform so that it accurately represents the play progress of its sound.
     */
    update: function () {
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

}());
