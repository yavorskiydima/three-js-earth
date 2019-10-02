import '../styles/index.scss';
import { Earth } from './earth';
import { showVideo, showFinalButton } from './showVideoCallback';
import { objectCoords, viewObjectList } from './city.const';

const cityId = document.getElementById('city');
const cityName = document.getElementById('cityName');

const DELAY_START = 5000; // задержка в начале перед звонком
const TIME_WAIT_PHONE = 5000; // задержка звонка
const TIME_SHOW_CITY = 2000; // время за которое идет приближение к городу
const DELAY_SHOW_VIDEO = 6000; //время которое пульсирует точка

let cityCount = 0;

export const earth = new Earth('webgl');

earth.enableRender(false);

export function endVideo() {
  cityId.style.opacity = '0';
  cityId.style.transform = 'scale(0)';
  cityCount++;
  if (cityCount === viewObjectList.length) {
    earth.showRus();
    showFinalButton();
  } else {
    earth.defaultCamera();
    setTimeout(() => $('.phone').css('display', 'block'), TIME_WAIT_PHONE + DELAY_START);
  }
}
objectCoords.forEach(item => {
  earth.newCity(item.name, { lat: item.lat, lon: item.lon }, (name) => console.log(name));
});

$('.logo').click(function () {
  earth.enableRender(true);
  $('.logo').addClass('end');
  setTimeout(() => {
    $('.logo').css('display', 'none');
    earth.enableControls(true);
    setTimeout(() => $('.phone').css('display', 'block'), TIME_WAIT_PHONE);
  }, 2100);
});

//обработка нажатия на телефон
$('.phone').click(function () {
  $('.phone').css('display', 'none');
  earth.showCity(viewObjectList[cityCount].name, TIME_SHOW_CITY);
  setTimeout(() => {
    cityName.innerHTML = viewObjectList[cityCount].cityName;
    cityName.style.display = 'inline';
    cityId.style.opacity = '.7';
    cityId.style.transform = 'scale(1)';
  }, TIME_SHOW_CITY);
  setTimeout(() => showVideo(viewObjectList[cityCount].video), TIME_SHOW_CITY + DELAY_SHOW_VIDEO);
});
