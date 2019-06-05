import '../styles/index.scss';
import { city } from '../city';

const earth = new Earth('webgl');
earth.axis();

function callbackFunc(name) {
    console.log(name);
}

city.map(item => earth.newCity(item.name, { lat: item.lat, lon: item.lon }, callbackFunc));


//setTimeout(() => earth.showCity('Союз «Уральская ТПП»', 4000), 4000);
