import { endVideo } from './index';
import { earth } from './index';
import { objectLine, } from './city.const';
const videoBlock = document.getElementById('videoBlock');
const video = document.getElementById('video');
const finalButton = document.getElementById('start');
const startEndVideo = document.getElementById('active');
const endPic = document.getElementById('end');

const audio = new Audio('/images/final-audio.mp3');

export const showVideo = (videoUrl, end = false) => {
  video.setAttribute('src', videoUrl);
  videoBlock.style.display = 'flex';
  earth.enableRender(false);
  setTimeout(() => {
    video.addEventListener('ended', end ? hideVideoLast : hideVideo);
    document.addEventListener('keyup', end ? stopOnEscLast : stopOnEsc);
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
    earth.enableRender(true);
    stopVideo();
    endVideo();
  }, 800);
  setTimeout(() => {
    videoBlock.style.display = 'none';
    videoBlock.style.transitionDuration = '0';
  }, 1600);
};
export const hideVideoLast = () => {
  video.removeEventListener('ended', hideVideo);
  document.removeEventListener('keyup', stopOnEsc);
  setTimeout(() => {
    endPic.style.display = 'block';
    endPic.style.opacity = '1';
    videoBlock.style.opacity = '0';
  }, 800);

  setTimeout(() => {
    videoBlock.style.display = 'none';
    videoBlock.style.transitionDuration = '0';
  }, 3000);
};
export function showFinalButton() {
  finalButton.style.display = 'block';
  setTimeout(() => {
    finalButton.style.opacity = '1';
    finalButton.style.transform = 'translateY(0px)';
    finalButton.addEventListener('click', activateNet);
  }, 4000);
}
function stopVideo() {
  video.pause();
  video.currentTime = 0;
}
function stopOnEsc(e) {
  if (e.keyCode === 27) {
    hideVideo(endVideo);
  }
}
function stopOnEscLast(e) {
  if (e.keyCode === 27) {
    hideVideoLast(endVideo);
  }
}

function startEndVideoEvent() {
  audio.pause();
  showVideo('./images/videoplayback-sd.mp4', true);
}
function activateNet() {
  audio.play();
  finalButton.style.transform = 'translateY(40px)';
  finalButton.style.opacity = '0';
  setTimeout(() => {
    finalButton.style.display = 'none';
    finalButton.removeEventListener('click', activateNet);
    setTimeout(() => {
      startEndVideo.style.display = 'flex';
      startEndVideo.addEventListener('click', startEndVideoEvent);
    }, 2000);
    setTimeout(() => earth.startNeuron(), 1000);
    objectLine.forEach(line => earth.line(line[0], line[1]));
  }, 1300);
}
