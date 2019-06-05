import '../styles/index.scss';

const earth = new Earth('webgl');
earth.axis();

function callbackFunc(name) {
    console.log(name);
}

earth.newCity('Ekaterinburg', { lat: 56.8389261, lon: 60.6057025 }, callbackFunc);
earth.newCity('Moscow', { lat: 55.755826, lon: 37.617300 }, callbackFunc);
earth.newCity('Test', { lat: 56.29737555, lon: 49.11150125 }, callbackFunc);


setTimeout(() => earth.showCity('Ekaterinburg', 4000), 2000);