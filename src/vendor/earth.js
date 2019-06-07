class Earth {
	radius = 5;
	segments = 64;

	isEarthRotation = null;

	constructor(el) {
		this.init(el)
	}

	init(el) {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.interaction = new THREE.Interaction(this.renderer, this.scene, this.camera);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById(el).appendChild(this.renderer.domElement);
		this.controls.maxDistance = 40;
		this.controls.minDistance = 10;
		this.controls.maxPolarAngle = 1;
		this.controls.minPolarAngle = 1;
		this.controls.autoRotate = true;
		this.controls.autoRotateSpeed = 2;
		this.camera.position.x = -12.772980418090368;
		this.camera.position.y = 8.304313035745599;
		this.camera.position.z = -2.0294497591270346;
		this.enableControls(false);
		this.scene.add(new THREE.AmbientLight(0xffffff, 1));
		this.star = createStars(90, 64);
		this.scene.add(this.star)
		this.earth = new THREE.Group();
		this.sphere = createSphere(this.radius, this.segments);
		this.sphere.rotation.y = 1.57;
		this.earth.add(this.sphere);
		this.earth.add(createClouds(this.radius, this.segments));
		this.scene.add(this.earth);
		this.render();

		function createSphere(radius, segments) {
			return new THREE.Mesh(
				new THREE.SphereGeometry(radius, segments, segments),
				new THREE.MeshPhongMaterial({
					map: new THREE.TextureLoader().load('images/2_no_clouds_4k.jpg'),
					bumpMap: new THREE.TextureLoader().load('images/elev_bump_4k.jpg'),
					bumpScale: 0.005,
					specularMap: new THREE.TextureLoader().load('images/water_4k.png'),
					specular: new THREE.Color('grey')
				})
			);
		}

		function createClouds(radius, segments) {
			return new THREE.Mesh(
				new THREE.SphereGeometry(radius + 0.003, segments, segments),
				new THREE.MeshPhongMaterial({
					map: new THREE.TextureLoader().load('images/fair_clouds_4k.png'),
					transparent: true
				})
			);
		}

		function createStars(radius, segments) {
			return new THREE.Mesh(
				new THREE.SphereGeometry(radius, segments, segments),
				new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load('images/galaxy_starfield.png'),
					side: THREE.BackSide
				})
			);
		}
	}

	render = () => {
		this.controls.update();
		TWEEN.update();
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		if (this.isEarthRotation) {
			this.earth.rotation.x += this.isEarthRotation.x;
			this.earth.rotation.y += this.isEarthRotation.y;
			this.earth.rotation.z += this.isEarthRotation.z;
		}
		this.star.rotation.x += 0.0005

		requestAnimationFrame(this.render);
		this.renderer.render(this.scene, this.camera);
	}

	defaultCamera() {

		new TWEEN.Tween(this.camera.position)
			.to({ x: -12.772980418090368, y: 8.304313035745599, z: -2.0294497591270346 }, 4000)
			.easing(TWEEN.Easing.Cubic.In)
			.onComplete(() => {
				this.controls.minDistance = 10;
				this.controls.maxPolarAngle = 1;
				this.controls.minPolarAngle = 1;
				this.controls.autoRotate = true;
				this.enableControls(true);
			})
			.start()
	}

	move(x, y, z) {
		this.isEarthRotation = (x === undefined) ? null : { x, y, z }
	}
	enableControls(flag) {
		if (flag) this.controls.autoRotateSpeed = 0.3;
		this.controls.enabled = flag;
	}

	showCity(name, time) {
		const checkCollision = (position) => {
			var direction = new THREE.Vector3(position.x, position.y, position.z);
			var startPoint = this.camera.position.clone();
			var directionVector = direction.sub(startPoint);
			var ray = new THREE.Raycaster(startPoint, directionVector.normalize());
			this.scene.updateMatrixWorld();
			var rayIntersects = ray.intersectObject(this.sphere, true);
			return Boolean(rayIntersects.length);
		}
		this.controls.minDistance = 0;
		this.controls.maxPolarAngle = Math.PI;
		this.controls.minPolarAngle = 0;
		this.controls.autoRotate = false;
		this.enableControls(false);
		const city = this.scene.getObjectByName(name)
		city.material.color.r = 1;
		city.material.color.g = 0;
		city.material.color.b = 0;
		const XYZ = this.decodeCoord(city.lat, city.lon, this.radius + 1)
		console.log(checkCollision(XYZ))
		if (checkCollision(XYZ)) {
			let srX = (this.camera.position.x + XYZ.x) * 2;
			let srY = (this.camera.position.y + XYZ.y) * 2;
			let srZ = (this.camera.position.z + XYZ.z) * 2;
			const min = Math.min(Math.abs(srX), Math.abs(srY), Math.abs(srZ));
			if (Math.abs(min) === Math.abs(srX)) { srX = srX > 0 ? 15 : -15 }
			else if (Math.abs(min) === Math.abs(srY)) { srY = srY > 0 ? 15 : -15 }
			else { srZ = srZ > 0 ? 15 : -15 }
			const end = new TWEEN.Tween(this.camera.position)
				.to(XYZ, time / 2)
				.easing(TWEEN.Easing.Cubic.Out)

			new TWEEN.Tween(this.camera.position)
				.to({ x: srX, y: srY, z: srZ }, time / 2)
				.easing(TWEEN.Easing.Cubic.In)
				.onComplete(() => {
					end.start();
				})
				.start()
		} else {
			new TWEEN.Tween(this.camera.position)
				.to(XYZ, time)
				.easing(TWEEN.Easing.Cubic.InOut)
				.start()
		}
	}

	axis() {
		//синий
		this.scene.add(line([0, 0, 0], [100, 0, 0], 0x0000ff));
		//красный
		this.scene.add(line([0, 0, 0], [0, 100, 0], 0xff0000));
		//белый
		this.scene.add(line([0, 0, 0], [0, 0, 100], 0xffffff));

		function line(start, finish, color) {
			var geometry = new THREE.Geometry();
			geometry.vertices.push(new THREE.Vector3(...start), new THREE.Vector3(...finish));
			return new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }));
		}
	}
	newCity(name, coord, func) {
		let sphereGeometry = new THREE.SphereGeometry(0.02, 16, 16);
		let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		let earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
		earthMesh.name = name;
		earthMesh.lat = coord.lat;
		earthMesh.lon = coord.lon;
		const XYZ = this.decodeCoord(coord.lat, coord.lon, this.radius)
		earthMesh.position.z = XYZ.z;
		earthMesh.position.x = XYZ.x;
		earthMesh.position.y = XYZ.y;
		earthMesh.on('click', ev => {
			return func(ev.data.target.name)
		});

		this.earth.add(earthMesh)
	}

	decodeCoord(lat, lon, r) {
		var phi = (90 - lat) * (Math.PI / 180);
		var theta = (lon + 180) * (Math.PI / 180);
		const obj = {};
		obj.z = (r * Math.sin(phi) * Math.cos(theta));
		obj.x = (r * Math.sin(phi) * Math.sin(theta));
		obj.y = (r * Math.cos(phi));
		return obj;
	}

}
