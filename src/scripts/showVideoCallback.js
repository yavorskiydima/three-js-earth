import { endVideo } from './index';
const videoBlock = document.getElementById('videoBlock');
const video = document.getElementById('video');
const finalButton = document.getElementById('finalButton');
export const showVideo = videoUrl => {
  video.setAttribute('src', videoUrl);
  videoBlock.style.display = 'flex';
  setTimeout(() => {
    video.play();
    video.addEventListener('ended', hideVideo);
    document.addEventListener('keyup', stopOnEsc);
    videoBlock.style.opacity = '1';
    videoBlock.style.width = '100%';
    videoBlock.style.height = '100%';
    videoBlock.style.visibility = 'visible';
  }, 100);
};
export const hideVideo = () => {
  console.log('ensd');
  video.removeEventListener('ended', hideVideo);
  document.removeEventListener('keyup', stopOnEsc);
  videoBlock.style.opacity = '0';
  videoBlock.style.width = '0';
  videoBlock.style.height = '0';
  videoBlock.style.visibility = 'hidden';
  setTimeout(() => {
    videoBlock.style.display = 'none';
    stopVideo();
    endVideo();
  }, 1000);
};

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}
function stopOnEsc(e) {
  if (e.keyCode === 27) {
    hideVideo(endVideo);
  }
}
export function showFinalButton() {
  finalButton.style.display = 'block';
  setTimeout(() => {
    finalButton.style.opacity = '1';
  }, 4000);
}
