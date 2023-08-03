import player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const vimeoPlayer = new player(iframe);

vimeoPlayer.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }),
  1000
);
window.addEventListener(
  'load',
  vimeoPlayer
    .setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0)
    .then(function (seconds) {
      console.log(`${seconds} = the actual time that the player seeked to`);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log(
            'the time was less than 0 or greater than the video’s duration'
          );
          break;
        default:
          console.log('some other error occurred');
          break;
      }
    })
);
