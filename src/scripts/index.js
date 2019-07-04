import '../styles/index.scss';
import { Earth } from './earth';
import { showVideo, showFinalButton } from './showVideoCallback';
import { city } from '../city';

const cityId = document.getElementById('city');
const cityName = document.getElementById('cityName');

const DELAY_START = 5000; // задержка в начале перед звонком
const TIME_WAIT_PHONE = 5000; // задержка звонка
const TIME_SHOW_CITY = 2000; // время за которое идет приближение к городу
const DELAY_SHOW_VIDEO = 6000; //время которое пульсирует точка

let cityCount = 0;
const cityView = [
  'Союз «Пермская ТПП»',
  'Союз «Южно-Уральская ТПП»',
  'Союз «Дальневосточная ТПП»',
  'Союз «ТПП Ставропольского края»',
  'Союз «ТПП Краснодарского края»',
  'Союз «ТПП Воронежской области»',
  'Союз «ТПП Саратовской области»',
  'Союз «Санкт-Петербургская ТПП»',
];
const cityNameText = [
  'Пермь',
  'Челябинск',
  'Хабаровск',
  'Ставрополь',
  'Краснодар',
  'Воронеж',
  'Саратов',
  'Санкт-Петербург',
];

export const earth = new Earth('webgl');
earth.stopRender();

$('.phone').css('display', 'none');

//callback нажатия на город
function callbackFunc(name) {
  console.log(name);
}

//callback окончания видео
export function endVideo() {
  // cityId.style.display = 'none';
  // cityName.style.display = 'none';
  cityId.style.opacity = '0';
  cityId.style.transform = 'scale(0)';
  cityCount++;
  if (cityCount === 1) {
    //отображение кнопки запуска нейросети cityView.length
    earth.showRus();
    showFinalButton();
  } else {
    earth.defaultCamera();
    setTimeout(() => {
      $('.phone').css('display', 'block');
    }, TIME_WAIT_PHONE + DELAY_START);
  }
}
city.forEach(item => {
  earth.newCity(item.name, { lat: item.lat, lon: item.lon }, callbackFunc);
});

//обработка старта
$('.logo').click(function() {
  earth.startRender();
  $('.logo').addClass('end');
  setTimeout(() => {
    $('.logo').css('display', 'none');
    earth.enableControls(true);
    setTimeout(() => {
      $('.phone').css('display', 'block');
    }, TIME_WAIT_PHONE);
  }, 2100);
});

//обработка нажатия на телефон
$('.phone').click(function() {
  $('.phone').css('display', 'none');
  earth.showCity(cityView[cityCount], TIME_SHOW_CITY);
  setTimeout(() => {
    cityName.innerHTML = cityNameText[cityCount];
    // cityId.style.display = 'block';
    cityName.style.display = 'inline';
    cityId.style.opacity = '.7';
    cityId.style.transform = 'scale(1)';
  }, TIME_SHOW_CITY);
  setTimeout(() => {
    showVideo('./images/videoplayback.mp4');
  }, TIME_SHOW_CITY + DELAY_SHOW_VIDEO);
});
