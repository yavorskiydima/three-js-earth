import '../styles/index.scss';

const earth = new Earth('webgl');
earth.axis();

earth.newCity({ lat: -55.82597325, lon: -67.43408203 });
earth.newCity({ lat: 21.44284311, lon: -86.81945801 });

//setTimeout(() => earth.showCity({ lat: -55.82597325, lon: -67.43408203 }, 5000), 5000);
setTimeout(() => earth.move(0.1, 0, 0), 2000);
setTimeout(() => earth.move(), 5000);