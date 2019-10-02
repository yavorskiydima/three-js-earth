import { endVideo } from './index';
import { earth } from './index';
import { city } from '../city';
const videoBlock = document.getElementById('videoBlock');
const video = document.getElementById('video');
const finalButton = document.getElementById('start');
const startEndVideo = document.getElementById('active');
const endPic = document.getElementById('end');

const audio = new Audio('/images/final-audio.mp3');

export const showVideo = (videoUrl, end = false) => {
  video.setAttribute('src', videoUrl);
  videoBlock.style.display = 'flex';
  earth.stopRender();
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
    earth.startRender();
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
    earth.line('Союз «Приморская ТПП»', 'Союз «Дальневосточная ТПП»');
    earth.line('Союз «Дальневосточная ТПП»', 'Союз «Сахалинская ТПП»');
    earth.line('Союз «Сахалинская ТПП»', 'Союз «Приморская ТПП»');
    earth.line('Союз «Дальневосточная ТПП»', 'Союз «ТПП г.Советская Гавань»');
    earth.line('Союз «ТПП г.Советская Гавань»', 'Союз «Сахалинская ТПП»');
    earth.line('Союз «Дальневосточная ТПП»', 'Союз «Магаданская ТПП»');
    earth.line('Союз «Магаданская ТПП»', 'Союз «ТПП г.Советская Гавань»');
    earth.line('Союз «ТПП Амурской области»', 'Союз «Магаданская ТПП»');
    earth.line('Союз «Дальневосточная ТПП»', 'Союз «ТПП Амурской области»');
    earth.line('Союз «ТПП Амурской области»', 'Союз «Приморская ТПП»');
    earth.line('Союз «Магаданская ТПП»', 'Союз «ТПП Республики Саха (Якутия)»');
    earth.line(
      'Союз «ТПП Республики Саха (Якутия)»',
      'Союз «ТПП Амурской области»',
    );
    earth.line('Союз «Приморская ТПП»', 'Союз «Забайкальская ТПП»');
    earth.line('Союз «Забайкальская ТПП»', 'Союз «ТПП Амурской области»');
    earth.line('Союз «ТПП г.Братска»', 'Союз «Забайкальская ТПП»');
    earth.line('Союз «Забайкальская ТПП»', 'Союз «ТПП Республики Бурятия»');
    earth.line('Союз «ТПП Республики Бурятия»', 'Союз «ТПП г.Братска»');
    earth.line('Союз «ТПП г.Братска»', 'Союз «ТПП Восточной Сибири»');
    earth.line('Союз «ТПП Восточной Сибири»', 'Союз «ТПП Республики Бурятия»');
    earth.line(
      'Союз «ТПП Республики Саха (Якутия)»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line('Союз «ТПП г.Братска»', 'Союз «ТПП Республики Тыва»');
    earth.line('Союз «ТПП Республики Тыва»', 'Союз «ТПП Восточной Сибири»');
    earth.line(
      'Союз «ТПП г.Братска»',
      'Союз «Южно-региональная ТПП Красноярского края»',
    );
    earth.line(
      'Союз «Южно-региональная ТПП Красноярского края»',
      'Союз «ТПП Республики Тыва»',
    );
    earth.line('Союз «ТПП г.Братска»', 'Союз «Центрально-Сибирская ТПП»');
    earth.line(
      'Союз «Центрально-Сибирская ТПП»',
      'Союз «Южно-региональная ТПП Красноярского края»',
    );
    earth.line('Союз «ТПП Республики Тыва»', 'Союз «ТПП Республики Алтай»');
    earth.line(
      'Союз «ТПП Республики Алтай»',
      'Союз «Южно-региональная ТПП Красноярского края»',
    );
    earth.line('Союз «ТПП Республики Алтай»', 'Союз «Кузбасская ТПП»');
    earth.line(
      'Союз «Кузбасская ТПП»',
      'Союз «Южно-региональная ТПП Красноярского края»',
    );
    earth.line('Союз «Центрально-Сибирская ТПП»', 'Союз «Кузбасская ТПП»');
    earth.line('Союз «ТПП Республики Алтай»', 'Союз «Алтайская ТПП»');
    earth.line('Союз «Кузбасская ТПП»', 'Союз «Алтайская ТПП»');
    earth.line('Союз «Кузбасская ТПП»', 'Союз «Новосибирская городская ТПП»');
    earth.line('Союз «Новосибирская городская ТПП»', 'Союз «Алтайская ТПП»');
    earth.line('Союз «Новосибирская городская ТПП»', 'Союз «Томская ТПП»');
    earth.line('Союз «Томская ТПП»', 'Союз «Центрально-Сибирская ТПП»');
    earth.line('Союз «Томская ТПП»', 'Союз «Нижневартовская ТПП»');
    earth.line('Союз «Нижневартовская ТПП»', 'Союз «Центрально-Сибирская ТПП»');
    earth.line(
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
      'Союз «Нижневартовская ТПП»',
    );
    earth.line('Союз «Нижневартовская ТПП»', 'Союз «Сургутская ТПП»');
    earth.line(
      'Союз «Сургутская ТПП»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line('Союз «Новосибирская ТПП»', 'Союз «Нижневартовская ТПП»');
    earth.line('Союз «Новосибирская ТПП»', 'Союз «Омская ТПП»');
    earth.line('Союз «Омская ТПП»', 'Союз «Нижневартовская ТПП»');
    earth.line('Союз «Алтайская ТПП»', 'Союз «Омская ТПП»');
    earth.line('Союз «Сургутская ТПП»', 'Союз «Омская ТПП»');
    earth.line(
      'Союз «Сургутская ТПП»',
      'Союз «ТПП Ханты-Мансийского автономного округа - Югры»',
    );
    earth.line(
      'Союз «ТПП Ханты-Мансийского автономного округа - Югры»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line(
      'Союз «Омская ТПП»',
      'Союз «ТПП Ханты-Мансийского автономного округа - Югры»',
    );
    earth.line(
      'Союз «ТПП Ханты-Мансийского автономного округа - Югры»',
      'Союз «Няганская ТПП»',
    );
    earth.line(
      'Союз «Няганская ТПП»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line('Союз «Няганская ТПП»', 'Союз «ТПП г.Ухты»');
    earth.line(
      'Союз «ТПП г.Ухты»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line(
      'Союз «Нижневартовская ТПП»',
      'Союз «ТПП Республики Саха (Якутия)»',
    );
    earth.line('Союз «Нижневартовская ТПП»', 'Союз «ТПП г.Братска»');
    earth.line('Союз «ТПП г.Братска»', 'Союз «ТПП Республики Саха (Якутия)»');
    earth.line(
      'Союз «Забайкальская ТПП»',
      'Союз «ТПП Республики Саха (Якутия)»',
    );
    earth.line('Союз «ТПП г.Ухты»', 'Союз «Архангельская ТПП»');
    earth.line(
      'Союз «Архангельская ТПП»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line('Союз «Архангельская ТПП»', 'Союз «ТПП Мурманской области»');
    earth.line(
      'Союз «ТПП Мурманской области»',
      'Союз «ТПП Ямало-Ненецкого автономного округа»',
    );
    earth.line('Союз «Омская ТПП»', 'Союз «ТПП Тюменской области»');
    earth.line(
      'Союз «ТПП Тюменской области»',
      'Союз «ТПП Ханты-Мансийского автономного округа - Югры»',
    );
    earth.line('Союз «Няганская ТПП»', 'Союз «ТПП Тюменской области»');
    earth.line('Союз «ТПП Тюменской области»', 'Союз «ТПП г. Кургана»');
    earth.line('Союз «ТПП г. Кургана»', 'Союз «Омская ТПП»');
    earth.line('Союз «ТПП г. Кургана»', 'Союз «Южно-Уральская ТПП»');
    earth.line('Союз «Южно-Уральская ТПП»', 'Союз «ТПП Тюменской области»');
    earth.line('Союз «ТПП Тюменской области»', 'Союз «Уральская ТПП»');
    earth.line('Союз «Уральская ТПП»', 'Союз «Южно-Уральская ТПП»');
    earth.line('Союз «ТПП Тюменской области»', 'Союз «ТПП г. Нижний Тагил»');
    earth.line('Союз «ТПП г. Нижний Тагил»', 'Союз «Уральская ТПП»');
    earth.line('Союз «Няганская ТПП»', 'Союз «ТПП г. Нижний Тагил»');
    earth.line('Союз «ТПП г. Нижний Тагил»', 'Союз «Верхнекамская ТПП»');
    earth.line('Союз «Верхнекамская ТПП»', 'Союз «Няганская ТПП»');
    earth.line('Союз «ТПП г.Ухты»', 'Союз «Верхнекамская ТПП»');
    earth.line('Союз «Южно-Уральская ТПП»', 'Союз «Магнитогорская ТПП»');
    earth.line(
      'Союз «Магнитогорская ТПП»',
      'Союз «ТПП Республики Башкортостан»',
    );
    earth.line(
      'Союз «ТПП Республики Башкортостан»',
      'Союз «Южно-Уральская ТПП»',
    );
    earth.line('Союз «ТПП Республики Башкортостан»', 'Союз «Удмуртская ТПП»');
    earth.line('Союз «Удмуртская ТПП»', 'Союз «Южно-Уральская ТПП»');
    earth.line('Союз «Удмуртская ТПП»', 'Союз «Пермская ТПП»');
    earth.line('Союз «Пермская ТПП»', 'Союз «Южно-Уральская ТПП»');
    earth.line('Союз «Пермская ТПП»', 'Союз «Уральская ТПП»');
    earth.line('Союз «Пермская ТПП»', 'Союз «ТПП г. Нижний Тагил»');
    earth.line('Союз «Верхнекамская ТПП»', 'Союз «Пермская ТПП»');
    earth.line('Союз «Магнитогорская ТПП»', 'Союз «ТПП Оренбургской области»');
    earth.line(
      'Союз «ТПП Оренбургской области»',
      'Союз «ТПП Республики Башкортостан»',
    );
    earth.line('Союз «Удмуртская ТПП»', 'Союз «Вятская ТПП»');
    earth.line('Союз «Вятская ТПП»', 'Союз «Пермская ТПП»');
    earth.line('Союз «Вятская ТПП»', 'Союз «Верхнекамская ТПП»');
    earth.line('Союз «Вятская ТПП»', 'Союз «ТПП Республики Коми»');
    earth.line('Союз «ТПП Республики Коми»', 'Союз «ТПП г.Ухты»');
    earth.line('Союз «ТПП Республики Коми»', 'Союз «Верхнекамская ТПП»');
    earth.line('Союз «Архангельская ТПП»', 'Союз «ТПП Республики Коми»');
    earth.line('Союз «Архангельская ТПП»', 'Союз «Вятская ТПП»');
    earth.line('Союз «Петрозаводская ТПП»', 'Союз «Архангельская ТПП»');
    earth.line('Союз «Петрозаводская ТПП»', 'Союз «ТПП Мурманской области»');
    earth.line('Союз «ТПП Республики Карелия»', 'Союз «Вятская ТПП»');
    earth.line('Союз «ТПП Республики Карелия»', 'Союз «Вологодская ТПП»');
    earth.line('Союз «Санкт-Петербургская ТПП»', 'Союз «Вологодская ТПП»');
    earth.line(
      'Союз «Санкт-Петербургская ТПП»',
      'Союз «ТПП Республики Карелия»',
    );
    earth.line('Союз «Вологодская ТПП»', 'Союз «Вятская ТПП»');
    earth.line('Союз «ТПП Оренбургской области»', 'Союз «Астраханская ТПП»');
    earth.line('Союз «ТПП Самарской области»', 'Союз «Астраханская ТПП»');
    earth.line(
      'Союз «ТПП Самарской области»',
      'Союз «ТПП Оренбургской области»',
    );
    earth.line(
      'Союз «ТПП Самарской области»',
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
    );
    earth.line(
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
      'Союз «ТПП Оренбургской области»',
    );
    earth.line(
      'Союз «ТПП Республики Башкортостан»',
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
    );
    earth.line(
      'Союз «ТПП г.Набережные Челны и региона «Закамье»',
      'Союз «ТПП Республики Башкортостан»',
    );
    earth.line(
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
      'Союз «ТПП г.Набережные Челны и региона «Закамье»',
    );
    earth.line(
      'Союз «ТПП г.Набережные Челны и региона «Закамье»',
      'Союз «Удмуртская ТПП»',
    );
    earth.line(
      'Союз «ТПП г.Набережные Челны и региона «Закамье»',
      'Союз «Вятская ТПП»',
    );
    earth.line('Союз «Вятская ТПП»', 'Союз «ТПП Республики Татарстан»');
    earth.line(
      'Союз «ТПП г.Набережные Челны и региона «Закамье»',
      'Союз «ТПП Республики Татарстан»',
    );
    earth.line(
      'Союз «ТПП Республики Татарстан»',
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
    );
    earth.line(
      'Союз «Ульяновская областная ТПП»',
      'Союз «ТПП Республики Татарстан»',
    );
    earth.line(
      'Союз «ТПП г.Альметьевск и Альметьевского района»',
      'Союз «Ульяновская областная ТПП»',
    );
    earth.line(
      'Союз «ТПП Самарской области»',
      'Союз «Ульяновская областная ТПП»',
    );
    earth.line('Союз «Санкт-Петербургская ТПП»', 'Союз «Новгородская ТПП»');
    earth.line('Союз «Новгородская ТПП»', 'Союз «Вологодская ТПП»');
    earth.line(
      'Союз «Санкт-Петербургская ТПП»',
      'Союз «ТПП Псковской области»',
    );
    earth.line('Союз «ТПП Псковской области»', 'Союз «Новгородская ТПП»');
    earth.line('Союз «Вологодская ТПП»', 'Союз «Ярославская областная ТПП»');
    earth.line('Союз «Ярославская областная ТПП»', 'Союз «Вятская ТПП»');
    earth.line('Союз «ТПП Псковской области»', 'Союз «Смоленская ТПП»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Калининградская ТПП»');
    earth.line('Союз «ТПП Псковской области»', 'Союз «Калининградская ТПП»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Новгородская ТПП»');
    earth.line('Союз «Ярославская областная ТПП»', 'Союз «Новгородская ТПП»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Ярославская областная ТПП»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Крымская ТПП»');
    earth.line('Союз «Калининградская ТПП»', 'Союз «Крымская ТПП»');
    earth.line('Союз «Астраханская ТПП»', 'Союз «ТПП Республики Калмыкия»');
    earth.line(
      'Союз «ТПП Республики Калмыкия»',
      'Союз «ТПП Республики Дагестан»',
    );
    earth.line('Союз «ТПП Республики Дагестан»', 'Союз «Астраханская ТПП»');
    earth.line('Союз «ТПП Республики Калмыкия»', 'Союз «Волгоградская ТПП»');
    earth.line('Союз «Астраханская ТПП»', 'Союз «Волгоградская ТПП»');
    earth.line('Союз «Астраханская ТПП»', 'Союз «ТПП Саратовской области»');
    earth.line(
      'Союз «ТПП Саратовской области»',
      'Союз «ТПП Самарской области»',
    );
    earth.line('Союз «Волгоградская ТПП»', 'Союз «ТПП Саратовской области»');
    earth.line(
      'Союз «ТПП Саратовской области»',
      'Союз «Ульяновская областная ТПП»',
    );
    earth.line(
      'Союз «ТПП Республики Калмыкия»',
      'Союз «ТПП Кабардино-Балкарской Республики»',
    );
    earth.line(
      'Союз «ТПП Республики Дагестан»',
      'Союз «ТПП Кабардино-Балкарской Республики»',
    );
    earth.line(
      'Союз «ТПП Ставропольского края»',
      'Союз «ТПП Кабардино-Балкарской Республики»',
    );
    earth.line(
      'Союз «ТПП Республики Калмыкия»',
      'Союз «ТПП Ставропольского края»',
    );
    earth.line('Союз «Крымская ТПП»', 'Союз «ТПП Ростовской области»');
    earth.line(
      'Союз «ТПП Ростовской области»',
      'Союз «ТПП Ставропольского края»',
    );
    earth.line(
      'Союз «ТПП Республики Калмыкия»',
      'Союз «ТПП Ростовской области»',
    );
    earth.line('Союз «Крымская ТПП»', 'Союз «ТПП Воронежской области»');
    earth.line(
      'Союз «ТПП Воронежской области»',
      'Союз «ТПП Ростовской области»',
    );
    earth.line('Союз «ТПП Ростовской области»', 'Союз «Волгоградская ТПП»');
    earth.line('Союз «ТПП Воронежской области»', 'Союз «Волгоградская ТПП»');
    earth.line(
      'Союз «ТПП Саратовской области»',
      'Союз «ТПП Воронежской области»',
    );
    earth.line('Союз «Смоленская ТПП»', 'Союз «ТПП Воронежской области»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Московская ТПП»');
    earth.line('Союз «Московская ТПП»', 'Союз «Ярославская областная ТПП»');
    earth.line('Союз «Смоленская ТПП»', 'Союз «Рязанская ТПП»');
    earth.line('Союз «Московская ТПП»', 'Союз «Рязанская ТПП»');
    earth.line('Союз «Рязанская ТПП»', 'Союз «ТПП Воронежской области»');
    earth.line(
      'Союз «Ярославская областная ТПП»',
      'Союз «ТПП Нижегородской области»',
    );
    earth.line('Союз «Вятская ТПП»', 'Союз «ТПП Нижегородской области»');
    earth.line('Союз «ТПП Нижегородской области»', 'Союз «Московская ТПП»');
    earth.line('Союз «ТПП Нижегородской области»', 'Союз «Рязанская ТПП»');
    earth.line(
      'Союз «ТПП Нижегородской области»',
      'Союз «ТПП Республики Татарстан»',
    );
    earth.line('Союз «Рязанская ТПП»', 'Союз «ТПП Республики Мордовия»');
    earth.line(
      'Союз «ТПП Нижегородской области»',
      'Союз «ТПП Республики Мордовия»',
    );
    earth.line(
      'Союз «Ульяновская областная ТПП»',
      'Союз «ТПП Республики Мордовия»',
    );
    earth.line(
      'Союз «ТПП Республики Мордовия»',
      'Союз «ТПП Республики Татарстан»',
    );
    earth.line(
      'Союз «ТПП Саратовской области»',
      'Союз «ТПП Республики Мордовия»',
    );
    earth.line('Союз «ТПП Саратовской области»', 'Союз «Рязанская ТПП»');
    earth.line(
      'Союз «ТПП Ставропольского края»',
      'Союз «ТПП Краснодарского края»',
    );
    earth.line(
      'Союз «ТПП Краснодарского края»',
      'Союз «ТПП Ростовской области»',
    );
    earth.line('Союз «Крымская ТПП»', 'Союз «ТПП Краснодарского края»');
    earth.line('Союз «ТПП Краснодарского края»', 'Союз «ТПП г.Сочи»');
    earth.line('Союз «ТПП Ставропольского края»', 'Союз «ТПП г.Сочи»');
    earth.line(
      'Союз «ТПП г.Сочи»',
      'Союз «ТПП Кабардино-Балкарской Республики»',
    );
  }, 1300);
}
