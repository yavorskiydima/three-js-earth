import '../styles/index.scss';

const earth = new Earth('webgl');
earth.axis();

earth.createCity1({ lat: -55.82597325, lon: -67.43408203 }, 0xffff00);
earth.createCity1({ lat: 21.44284311, lon: -86.81945801 }, 0xffff00);

setTimeout(() => earth.cameraRotation({ rotation: { x: -1.82733571724858, y: 0.3701029908999807, z: 2.4395892194765634 }, position: { x: 2.893691610234742, y: 7.214238619502502, z: -1.8924349409519294 } }, 5000), 5000);