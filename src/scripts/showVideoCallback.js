const videoBlock = document.getElementById("videoBlock");
const video = document.getElementById("video");
export const showVideo = videoUrl => {
  video.setAttribute("src", videoUrl);
  videoBlock.style.display = "flex";
  setTimeout(() => {
    video.on;
    video.play();
    video.addEventListener("ended", hideVideo);
    document.addEventListener("keyup", stopOnEsc);
    videoBlock.style.opacity = "1";
    videoBlock.style.width = "100%";
    videoBlock.style.height = "100%";
    videoBlock.style.visibility = "visible";
  }, 100);
};
export const hideVideo = () => {
  video.removeEventListener("ended", hideVideo);
  document.removeEventListener("keyup", stopOnEsc);
  videoBlock.style.opacity = "0";
  videoBlock.style.width = "0";
  videoBlock.style.height = "0";
  videoBlock.style.visibility = "hidden";
  setTimeout(() => {
    videoBlock.style.display = "none";
    stopVideo();
  }, 1000);
};

function stopVideo() {
  video.pause();
  video.currentTime = 0;
}
function stopOnEsc(e) {
  if (e.keyCode === 27) {
    hideVideo();
  }
}
