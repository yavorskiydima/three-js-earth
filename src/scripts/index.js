import "../styles/index.scss";
import { Earth } from "./earth";
import { showVideo, showFinalButton } from "./showVideoCallback";
import { city } from "../city";

const DELAY_START = 5000; // задержка в начале перед звонком
const TIME_WAIT_PHONE = 5000; // задержка звонка
const TIME_SHOW_CITY = 2000; // время за которое идет приближение к городу
const DELAY_SHOW_VIDEO = 2000; //время которое пульсирует точка

let cityCount = 0;
const cityView = [
  "Союз «Пермская ТПП»",
  "Союз «Южно-Уральская ТПП»",
  "Союз «Дальневосточная ТПП»",
  "Союз «ТПП Ставропольского края»",
  "Союз «ТПП Краснодарского края»",
  "Союз «ТПП Воронежской области»",
  "Союз «ТПП Саратовской области»",
  "Союз «Санкт-Петербургская ТПП»"
];

const audio = new Audio("/images/phone1.mp3");
audio.loop = true;

export const earth = new Earth("webgl");

$(".phone").css("display", "none");

//callback нажатия на город
function callbackFunc(name) {
  console.log(name);
}

//callback окончания видео
export function endVideo() {
  cityCount++;
  if (cityCount === 2) {
    //отображение кнопки запуска нейросети cityView.length
    earth.showRus();
    showFinalButton();
  } else {
    earth.defaultCamera();
    setTimeout(() => {
      $(".phone").css("display", "block");
      audio.play();
    }, TIME_WAIT_PHONE + DELAY_START);
  }
}
city.forEach(item => {
  earth.newCity(item.name, { lat: item.lat, lon: item.lon }, callbackFunc);
});

//обработка старта
$(".logo").click(function() {
  $(".logo").addClass("end");
  setTimeout(() => {
    $(".logo").css("display", "none");
    earth.enableControls(true);
    setTimeout(() => {
      $(".phone").css("display", "block");
      audio.play();
    }, TIME_WAIT_PHONE);
  }, 2100);
});

//обработка нажатия на телефон
$(".phone").click(function() {
  $(".phone").css("display", "none");
  audio.pause();
  earth.showCity(cityView[cityCount], TIME_SHOW_CITY);
  setTimeout(() => {
    showVideo("./images/videoplayback.mp4");
  }, TIME_SHOW_CITY + DELAY_SHOW_VIDEO);
});
