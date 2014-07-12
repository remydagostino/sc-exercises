(function main() {

  var longSound = new SC.Sound(SC.longSound),
      shortSound = new SC.Sound(SC.shortSound),
      shortWaveform = new SC.Waveform({
        canvas: document.getElementById('waveform-short'),
        sound: shortSound
      }),
      longWaveform = new SC.Waveform({
        canvas: document.getElementById('waveform-long'),
        sound: longSound
      });

  shortWaveform.render();
  longWaveform.render();

  $('#play-button-short').on('click', function () {
    shortSound.toggle();
    $(this).toggleClass('sc-button-pause sc-button-play');
  });

  $('#play-button-long').on('click', function () {
    longSound.toggle();
    $(this).toggleClass('sc-button-pause sc-button-play');
  });


}());
