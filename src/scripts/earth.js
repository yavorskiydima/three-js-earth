export class Earth {
  constructor(el) {
    this.radius = 5;
    this.isRender = true;
    this.showRussia = false;
    this.isPluseRotation = true;
    this.colorCity = 0x4263f5;
    this.colorGraphLine = 0x00c4f0;
    this.colorGraphPoint = 0x00d2ff;
    this.startNet = false;
    this.linkShowCity = null;

    this.init(el);
  };

  // генерация основных объектов (сцена, камера, контрол, земля, звезды, свет)
  init(el) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById(el).appendChild(this.renderer.domElement);

    // параметры вращения
    this.controls.maxDistance = 40;
    this.controls.minDistance = 10;
    this.controls.maxPolarAngle = 0.5;
    this.controls.minPolarAngle = 0.5;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 2;
    this.enableControls(false);

    // стартовая позиция камеры
    this.camera.position.x = -12.772980418090368;
    this.camera.position.y = 8.304313035745599;
    this.camera.position.z = -2.0294497591270346;

    // общий свет
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // звезды
    this.star = createStars(90, 64);
    this.scene.add(this.star);

    // группа для объектов планеты
    this.earth = new THREE.Group();
    this.scene.add(this.earth);

    // планета
    // поворот на 'y' сделан что бы подогнать под географические координаты
    this.sphere = createSphere(this.radius, 64);
    this.sphere.rotation.y = 1.57;
    this.earth.add(this.sphere);

    // группа для бегующих нейронов в конце анимации
    this.graph = new THREE.Group();
    this.earth.add(this.graph);

    // группа для городов
    this.city = new THREE.Group();
    this.earth.add(this.city);

    // группа для линий между городами
    this.lines = new THREE.Group();
    this.earth.add(this.lines);

    // свет для эффекта отражения
    const light = new THREE.PointLight(0xffffff, 0.8);
    light.position.set(-6.976531536867979, 13.4882272933105, 2.371717158616364);
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    this.earth.add(light);

    this.render();

    function createSphere(radius, segments) {
      const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, segments, segments),
        new THREE.MeshPhongMaterial({
          map: new THREE.TextureLoader().load('images/earth-texture.png'),
          opacity: 0.9,
          transparent: true,
        }));
      sphere.receiveShadow = true;
      sphere.castShadow = true;
      return sphere;
    }

    function createStars(radius, segments) {
      return new THREE.Mesh(
        new THREE.SphereGeometry(radius, segments, segments),
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('images/galaxy_starfield.png'),
          side: THREE.BackSide,
        }));
    }
  }

  render = () => {
    if (this.lines.children.length) {
      this.lines.children.forEach(line => {
        line.geometry.setFromPoints(line.points.slice(0, line.count));
        line.count = line.count + 3;
        if (line.count > 99) {
          this.earth.add(line);
          this.lines.remove(line);
        }
      });
    }
    if (this.showRussia) {
      this.isPluseRotation
        ? (this.earth.rotation.y += 0.001)
        : (this.earth.rotation.y -= 0.001);
      if (this.earth.rotation.y > 0.3) {
        this.isPluseRotation = false;
      } else if (this.earth.rotation.y < -0.5) {
        this.isPluseRotation = true;
      }
    }
    if (this.linkShowCity) {
      const speedScale = 0.05
      this.linkShowCity.material.opacity = this.linkShowCity.material.opacity - 0.01;
      this.linkShowCity.scale.x = this.linkShowCity.scale.x + speedScale;
      this.linkShowCity.scale.y = this.linkShowCity.scale.y + speedScale;
      this.linkShowCity.scale.z = this.linkShowCity.scale.z + speedScale;
      if (this.linkShowCity.material.opacity <= 0) {
        this.linkShowCity.material.opacity = 0.3;
        this.linkShowCity.scale.x = 1;
        this.linkShowCity.scale.y = 1;
        this.linkShowCity.scale.z = 1;
      }
    }
    this.controls.update();
    TWEEN.update();
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.startNet &&
      this.graph.children.forEach(element => {
        element.children.forEach(item => {
          item.children[1].material.opacity = item.children[1].material.opacity = item.children[1].material.opDown ? item.children[1].material.opacity - 0.06 : item.children[1].material.opacity + 0.1;

          if (item.children[1].material.opacity >= 0.2) item.children[1].material.opDown = true;
          if (item.children[1].material.opacity <= 0) item.children[1].material.opDown = false;
          let point = element.curve.getPointAt(item.pos);
          const len = element.curve.getLength() * item.pos;
          item.position.x = point.x;
          item.position.y = point.y;
          item.position.z = point.z;

          if (!item.checked && len > item.new) {
            this.newNeuron(element);
            item.checked = true;
          } else if (item.pos > 1.1) {
            element.remove(item);
          }
          item.pos += (1 / element.curve.getLength()) * item.speed;
        });
      });
    this.star.rotation.x += 0.0005;

    if (this.isRender) requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  enableRender(flag) {
    this.isRender = flag;
    if (flag) requestAnimationFrame(this.render);
  }

  enableControls(flag) {
    if (flag) this.controls.autoRotateSpeed = 0.3;
    this.controls.enabled = flag;
  }

  defaultCity() {
    this.scene.remove(this.linkShowCity);
  }

  startNeuron() {
    this.startNet = true;
  }

  defaultCamera() {
    this.defaultCity();
    new TWEEN.Tween(this.camera.position)
      .to(
        {
          x: -4.631767872694313,
          y: 9.419332177108378,
          z: -2.241881257156138,
        },
        4000,
      )
      .easing(TWEEN.Easing.Cubic.In)
      .onComplete(() => {
        this.controls.minDistance = 10;
        this.controls.maxPolarAngle = 0.5;
        this.controls.minPolarAngle = 0.5;
        this.controls.autoRotate = true;
        this.enableControls(true);
      })
      .start();
  }

  showCity(name, time) {
    const checkCollision = position => {
      var direction = new THREE.Vector3(position.x, position.y, position.z);
      var startPoint = this.camera.position.clone();
      var directionVector = direction.sub(startPoint);
      var ray = new THREE.Raycaster(startPoint, directionVector.normalize());
      this.scene.updateMatrixWorld();
      var rayIntersects = ray.intersectObject(this.sphere, true);
      return Boolean(rayIntersects.length);
    };
    this.controls.minDistance = 0;
    this.controls.maxPolarAngle = Math.PI;
    this.controls.minPolarAngle = 0;
    this.controls.autoRotate = false;
    this.enableControls(false);
    const city = this.scene.getObjectByName(name);
    city.material.color.r = 1;
    city.material.color.g = 1;
    city.material.color.b = 1;

    let geom = new THREE.SphereGeometry(0.07, 32, 32);
    let mat = new THREE.MeshLambertMaterial({
      color: 0xffffe6,
      opacity: 0.3,
      transparent: true,
    });
    this.linkShowCity = new THREE.Mesh(geom, mat);
    this.linkShowCity.position.set(city.position.x, city.position.y, city.position.z);
    this.linkShowCity.opDown = false;
    this.scene.add(this.linkShowCity);

    const XYZ = this.decodeCoord(city.lat, city.lon, this.radius + 1);
    if (checkCollision(XYZ)) {
      let srX = (this.camera.position.x + XYZ.x) * 2;
      let srY = (this.camera.position.y + XYZ.y) * 2;
      let srZ = (this.camera.position.z + XYZ.z) * 2;
      const min = Math.min(Math.abs(srX), Math.abs(srY), Math.abs(srZ));
      if (Math.abs(min) === Math.abs(srX)) {
        srX = srX > 0 ? 15 : -15;
      } else if (Math.abs(min) === Math.abs(srY)) {
        srY = srY > 0 ? 15 : -15;
      } else {
        srZ = srZ > 0 ? 15 : -15;
      }
      const end = new TWEEN.Tween(this.camera.position)
        .to(XYZ, time / 2)
        .easing(TWEEN.Easing.Cubic.Out);

      new TWEEN.Tween(this.camera.position)
        .to({ x: srX, y: srY, z: srZ }, time / 2)
        .easing(TWEEN.Easing.Cubic.In)
        .onComplete(() => {
          end.start();
        })
        .start();
    } else {
      new TWEEN.Tween(this.camera.position)
        .to(XYZ, time)
        .easing(TWEEN.Easing.Cubic.InOut)
        .start();
    }
  }

  newCity(name, coord) {
    let sphereGeometry = new THREE.SphereGeometry(0.03, 32, 32);
    let sphereMaterial = new THREE.MeshPhongMaterial({
      color: this.colorCity,
    });
    let earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = name;
    earthMesh.lat = coord.lat;
    earthMesh.lon = coord.lon;
    const XYZ = this.decodeCoord(coord.lat, coord.lon, this.radius - 0.01);
    earthMesh.position.z = XYZ.z;
    earthMesh.position.x = XYZ.x;
    earthMesh.position.y = XYZ.y;
    earthMesh.castShadow = true;
    this.city.add(earthMesh);
  }

  decodeCoord(lat, lon, r) {
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lon + 180) * (Math.PI / 180);
    const obj = {};
    obj.z = r * Math.sin(phi) * Math.cos(theta);
    obj.x = r * Math.sin(phi) * Math.sin(theta);
    obj.y = r * Math.cos(phi);
    return obj;
  }

  line(nameCity1, nameCity2) {
    const city1 = this.scene.getObjectByName(nameCity1);
    const city2 = this.scene.getObjectByName(nameCity2);
    const dist = Math.sqrt(
      (city1.position.x - city2.position.x) ** 2 +
      (city1.position.y - city2.position.y) ** 2 +
      (city1.position.z - city2.position.z) ** 2,
    );
    const p0 = city1.position;
    const p1 = this.decodeCoord(
      (city1.lat + city2.lat) / 2,
      (city1.lon + city2.lon) / 2,
      this.radius + dist / 4,
    );
    const p2 = city2.position;

    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(p0.x, p0.y, p0.z),
      new THREE.Vector3(p1.x, p1.y, p1.z),
      new THREE.Vector3(p2.x, p2.y, p2.z),
      new THREE.Vector3(p2.x, p2.y, p2.z),
    );

    let group = new THREE.Group();
    group.curve = curve;

    this.newNeuron(group);
    this.newLine(group);
    this.graph.add(group);
  }
  newNeuron(group) {

    let neuron = new THREE.Group();
    let opacity = Math.random() < 0.3;
    let pos = group.curve.getPointAt(0);
    let sphereGeometry = new THREE.SphereGeometry((opacity ? 0.015 : 0.0001), 8, 8);
    let sphereMaterial = new THREE.MeshLambertMaterial({
      color: this.colorGraphPoint,
      opacity: 0.7,
      transparent: true,
    });
    sphereMaterial.opDown = true;
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    neuron.add(sphere);

    let geom = new THREE.SphereGeometry((opacity ? 0.04 : 0.0001), 8, 8);
    let mat = new THREE.MeshPhongMaterial({
      color: 0xffffd0,
      opacity: 0,
      transparent: true,
    });
    let sphere1 = new THREE.Mesh(geom, mat);
    neuron.add(sphere1)

    neuron.position.set(pos.x, pos.y, pos.z);
    neuron.pos = 0;
    group.curve.getLength();
    neuron.speed = Math.random() * (0.03 - 0.01) + 0.01;
    neuron.new = group.curve.getLength() * (Math.random() * (0.9 - 0.6) + 0.6);
    group.add(neuron);
  }

  newLine(group) {
    let points = group.curve.getPoints(102);
    var geometry = new THREE.BufferGeometry().setFromPoints(points.slice(0, 1));
    var material = new THREE.LineBasicMaterial({
      color: this.colorGraphLine,
      opacity: 0.5,
      transparent: true,
    });
    var curveObject = new THREE.Line(geometry, material);
    curveObject.points = points;
    curveObject.count = 0;
    this.lines.add(curveObject);
  }

  // Показывает Россию
  showRus() {
    this.defaultCity();
    this.enableControls(false);
    new TWEEN.Tween(this.camera.position)
      .to(
        {
          x: -4.608861742362821,
          y: 8.306457425121318,
          z: -1.8960018165252785,
        },
        2000,
      )
      .easing(TWEEN.Easing.Cubic.In)
      .onComplete(() => {
        this.showRussia = true;
      })
      .start();
  }
}
