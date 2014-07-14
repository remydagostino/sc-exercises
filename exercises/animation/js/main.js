// Main
(function(root, dom, anim) {
  "use strict";

  var ANIMATION_TIME = 800;

  var state, timeout;

  state = {
    playing: false,
    anim: false
  };

  window.thing = state;

  root.onload = function() {
    var player = document.querySelector('.sc-Embed'),
        playPause = document.querySelector('.sc-PlayButton');

    // Play button clicked
    playPause.addEventListener('click', function() {
      // Prevent the user from clicking the button while the animation is going
      if (state.anim) {
        return;
      }

      state.anim = true;

      if (!state.playing) {
        player.classList.add('is-toPlay');
      }
      else {
        player.classList.add('is-fromPlay');
      }

      state.playing = !state.playing;
    });

    // Animation Ended
    [
      'animationend',
      'webkitAnimationEnd',
      'MSAnimationEnd'
    ].forEach(function(evName) {
      player.addEventListener(evName, function(ev) {
        if (ev.animationName === 'cover-slide') {
          if (state.playing) {
            player.classList.add('is-playing');
            player.classList.remove('is-toPlay');
          }
          else {
            player.classList.remove('is-playing');
            player.classList.remove('is-fromPlay');
          }

          state.anim = false;
        }
      });
    });
  };

})(window)

