import '../styles/index.scss';

const earth = new Earth('webgl');
earth.axis();

earth.newCity('Ekaterinburg', { lat: 56.8389261, lon: 60.6057025 });
earth.newCity('Moscow', { lat: 55.755826, lon: 37.617300 });

//earth.newCity({ lat: -55.82597325, lon: -67.43408203 });
//earth.newCity({ lat: 21.44284311, lon: -86.81945801 });

//setTimeout(() => earth.showCity({ lat: -55.82597325, lon: -67.43408203 }, 5000), 5000);

setTimeout(() => earth.showCity('Ekaterinburg', 4000), 2000);
setTimeout(() => earth.show('Ekaterinburg'), 2000);