class Earth {
	radius = 5;
	segments = 32;

	isEarthRotation = null;

	constructor(el) {
		this.init(el)
	}

	init(el) {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 100);
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.controls = new THREE.TrackballControls(this.camera);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById(el).appendChild(this.renderer.domElement);
		this.camera.position.z = 15;
		this.controls.maxDistance = 50;
		this.controls.minDistance = 8;
		this.scene.add(new THREE.AmbientLight(0xffffff, 1));
		this.scene.add(createStars(90, 64))
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
					map: THREE.ImageUtils.loadTexture('images/2_no_clouds_4k.jpg'),
					bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_4k.jpg'),
					bumpScale: 0.005,
					specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
					specular: new THREE.Color('grey')
				})
			);
		}

		function createClouds(radius, segments) {
			return new THREE.Mesh(
				new THREE.SphereGeometry(radius + 0.003, segments, segments),
				new THREE.MeshPhongMaterial({
					map: THREE.ImageUtils.loadTexture('images/fair_clouds_4k.png'),
					transparent: true
				})
			);
		}

		function createStars(radius, segments) {
			return new THREE.Mesh(
				new THREE.SphereGeometry(radius, segments, segments),
				new THREE.MeshBasicMaterial({
					map: THREE.ImageUtils.loadTexture('images/galaxy_starfield.png'),
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

		requestAnimationFrame(this.render);
		this.renderer.render(this.scene, this.camera);
	}

	startEarthRotation(x, y, z) {
		this.isEarthRotation = { x, y, z };
	}
	stopEarthRotation() {
		this.isEarthRotation = null;
	}

	cameraRotation(coords, time) {
		console.log(this.checkCollision(coords.position))
		if (this.checkCollision(coords.position)) {
			let srX = (this.camera.position.x + coords.position.x) * 2;
			let srY = (this.camera.position.y + coords.position.y) * 2;
			let srZ = (this.camera.position.z + coords.position.z) * 2;

			if (Math.abs(srX) < Math.abs(srY) && Math.abs(srX) < Math.abs(srZ)) { srX = srX > 0 ? 15 : -15 }
			else if (Math.abs(srY) < Math.abs(srX) && Math.abs(srY) < Math.abs(srZ)) { srY = srY > 0 ? 15 : -15 }
			else { srZ = srZ > 0 ? 15 : -15 }
			const end = new TWEEN.Tween(this.camera.position)
				.to(coords.position, time / 2)
				.easing(TWEEN.Easing.Cubic.Out)

			new TWEEN.Tween(this.camera.position)
				.to({ x: srX, y: srY, z: srZ }, time / 2)
				.easing(TWEEN.Easing.Cubic.In)
				.onComplete(function () {
					end.start();
				})
				.start()
		} else {
			new TWEEN.Tween(this.camera.position)
				.to(coords.position, time)
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
	createCity1(coord, color) {
		let sphereGeometry = new THREE.SphereGeometry(0.025, 8, 8);
		let sphereMaterial = new THREE.MeshBasicMaterial({ color });
		let earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
		const XYZ = this.decodeCoord(coord.lat, coord.lon)
		earthMesh.position.z = XYZ.z;
		earthMesh.position.x = XYZ.x;
		earthMesh.position.y = XYZ.y;
		this.earth.add(earthMesh)
	}

	checkCollision(position) {
		var direction = new THREE.Vector3(position.x, position.y, position.z);
		var startPoint = this.camera.position.clone();
		var directionVector = direction.sub(startPoint);
		var ray = new THREE.Raycaster(startPoint, directionVector.normalize());
		this.scene.updateMatrixWorld();
		var rayIntersects = ray.intersectObject(this.sphere, true);
		return Boolean(rayIntersects.length);
	}

	decodeCoord(lat, lon) {
		var phi = (90 - lat) * (Math.PI / 180);
		var theta = (lon + 180) * (Math.PI / 180);
		const obj = {};
		obj.z = ((this.radius) * Math.sin(phi) * Math.cos(theta));
		obj.x = ((this.radius) * Math.sin(phi) * Math.sin(theta));
		obj.y = ((this.radius) * Math.cos(phi));
		return obj;
	}
	changeX() {
		this.sphere.rotation.x += 0.03;
	}
	changeY() {
		this.sphere.rotation.y += 0.01;
	}
	changeZ() {
		this.sphere.rotation.z += 0.03;
	}

}
