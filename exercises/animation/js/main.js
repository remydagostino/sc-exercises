// Main
(function(root, dom, anim) {
  var ANIMATION_TIME = 800;

  var state, timeout;

  state = {
    playing: false,
    anim: false
  };

  root.onload = function() {
    var player = document.querySelector('.sc-Embed');
        playPause = document.querySelector('.sc-PlayButton');

    // Play button clicked
    playPause.addEventListener('click', function() {
      // Prevent the user from clicking the button while the animation is going
      if (anim) {
        return;
      }

      window.clearTimeout(timeout);
      anim = true;

      if (!state.playing) {
        player.classList.remove('is-fromPlay');
        player.classList.add('is-toPlay');

        timeout = window.setTimeout(function() {
          anim = false;
          player.classList.add('is-playing');
          player.classList.remove('is-toPlay');
        }, ANIMATION_TIME);
      }
      else {
        player.classList.remove('is-toPlay');
        player.classList.add('is-fromPlay');

        timeout = window.setTimeout(function() {
          anim = false;
          player.classList.remove('is-playing');
          player.classList.remove('is-fromPlay');
        }, ANIMATION_TIME);
      }

      state.playing = !state.playing;
    });

    // Animation Started
    /*[
      'animationstart',
      'webkitAnimationStart',
      'MSAnimationStart'
    ].forEach(function(evName) {
      player.addEventListener(evName, function(ev) {
        if (ev.animationName === 'embed-from-play') {
          player.classList.remove('is-playing');
        }
      });
    });*/

    // Animation Ended
    /*[
      'animationend',
      'webkitAnimationEnd',
      'MSAnimationEnd'
    ].forEach(function(evName) {
      player.addEventListener(evName, function(ev) {
        if (ev.animationName === 'embed-to-play') {
          player.classList.add('is-playing');
        }
      });
    });*/
  };

})(window)

