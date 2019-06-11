import { endVideo } from './index';
import { earth } from './index';
const videoBlock = document.getElementById('videoBlock');
const video = document.getElementById('video');
const finalButton = document.getElementById('finalButton');
export const showVideo = videoUrl => {
  video.setAttribute('src', videoUrl);
  videoBlock.style.display = 'flex';
  earth.stopRender();
  setTimeout(() => {
    video.addEventListener('ended', hideVideo);
    document.addEventListener('keyup', stopOnEsc);
    videoBlock.style.transitionDuration = '0.8s';
    videoBlock.style.transform = 'scale(1)';
    videoBlock.style.opacity = '1';
  }, 100);
  setTimeout(() => {
    videoBlock.style.background = 'black';
    video.play();
  }, 900);
};
export const hideVideo = () => {
  video.removeEventListener('ended', hideVideo);
  document.removeEventListener('keyup', stopOnEsc);
  videoBlock.style.background = 'none';
  setTimeout(() => {
    videoBlock.style.transform = 'scale(0.1)';
    videoBlock.style.opacity = '0';
    earth.startRender();
    stopVideo();
    endVideo();
  }, 800);
  setTimeout(() => {
    videoBlock.style.display = 'none';
    videoBlock.style.transitionDuration = '0';
  }, 1600);
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
