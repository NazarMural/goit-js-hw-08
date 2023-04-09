import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const saveCurrentTime = function (currentTime) {
  console.log('Current time: ' + currentTime);  
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

function getCurrentTime() {
  return localStorage.getItem('videoplayer-current-time');
}

if (getCurrentTime() !== null) {
  player.setCurrentTime(getCurrentTime());
}

player.on('timeupdate', function(data) {
    const currentTime = data.seconds;
    throttledSaveCurrentTime(currentTime);
});