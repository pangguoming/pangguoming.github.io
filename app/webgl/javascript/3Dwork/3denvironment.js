  var ThreeDEnvironment = {};

        ThreeDEnvironment.container;
        ThreeDEnvironment.camera;
        ThreeDEnvironment.scene;
        ThreeDEnvironment.renderer;
        ThreeDEnvironment.controls;
        ThreeDEnvironment.objcontroller; // add and transform object
        ThreeDEnvironment.clock;
        ThreeDEnvironment.loader;

        ThreeDEnvironment.changelableobjs;
        ThreeDEnvironment.projector; //pick object
        ThreeDEnvironment.mouseVector; //pick object
        ThreeDEnvironment.containerWidth;
        ThreeDEnvironment.containerHeight;

        ThreeDEnvironment.focusobject;
        init();
        animate();

        function init() {

            ThreeDEnvironment.clock = new THREE.Clock();

            ThreeDEnvironment.container = document.createElement('div');
            document.body.appendChild(ThreeDEnvironment.container);

            ThreeDEnvironment.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000000);
            ThreeDEnvironment.camera.position.set(100, 200, 0);
            ThreeDEnvironment.scene = new THREE.Scene();

            ThreeDEnvironment.projector = new THREE.Projector();
            ThreeDEnvironment.mouseVector = new THREE.Vector3();

            containerWidth = ThreeDEnvironment.container.clientWidth;
            containerHeight = ThreeDEnvironment.container.clientHeight;

            ThreeDEnvironment.changelableobjs = new THREE.Object3D();
            ThreeDEnvironment.scene.add(ThreeDEnvironment.changelableobjs);

            var materials = [
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/posx.jpg'), overdraw: true }), // right
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/negx.jpg'), overdraw: true }), // left
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/posy.jpg'), overdraw: true }), // top
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/negy.jpg'), overdraw: true }), // bottom
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/posz.jpg'), overdraw: true }), // back
					new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('javascript/3Dwork/object/houses/textures/negz.jpg'), overdraw: true })  // front
				];

            mesh = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000, 7, 7, 7), new THREE.MeshFaceMaterial(materials));
            mesh.scale.x = -1;
            ThreeDEnvironment.scene.add(mesh);

            var ambient = new THREE.AmbientLight(0x101030);
            ThreeDEnvironment.scene.add(ambient);

            var directionalLight1 = new THREE.DirectionalLight(0xffeedd);
            directionalLight1.position.set(500, 500, 500).normalize();
            ThreeDEnvironment.scene.add(directionalLight1);

            var directionalLight2 = new THREE.DirectionalLight(0xffeedd);
            directionalLight2.position.set(-500, -500, 500).normalize();
            ThreeDEnvironment.scene.add(directionalLight2);
            // model

            ThreeDEnvironment.loader = new THREE.JSONLoader(true);
            ThreeDEnvironment.loader.load("javascript/3Dwork/object/houses/Woodwind.js", function (geometry, materials) {

                var object = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                ThreeDEnvironment.scene.add(object);

                ThreeDEnvironment.controls = new THREE.FirstPersonControls(ThreeDEnvironment.camera);
                ThreeDEnvironment.controls.movementSpeed = 100;
                ThreeDEnvironment.controls.lookSpeed = 0.08;

            });
            ThreeDEnvironment.renderer = new THREE.WebGLRenderer();
            ThreeDEnvironment.renderer.setSize(window.innerWidth, window.innerHeight);
            ThreeDEnvironment.container.appendChild(ThreeDEnvironment.renderer.domElement);

            ThreeDEnvironment.objcontroller = new THREE.TransformControls(ThreeDEnvironment.camera, ThreeDEnvironment.renderer.domElement);
            ThreeDEnvironment.objcontroller.addEventListener('change', render);
            ThreeDEnvironment.scene.add(ThreeDEnvironment.objcontroller);

            window.addEventListener('resize', onWindowResize, false);
            window.addEventListener('mousedown', onMouseDown, false);
            window.addEventListener('keydown', onKeyDown, false);
        }

        function onMouseDown(e) {
			//pick object			
            ThreeDEnvironment.mouseVector.x = 2 * (e.clientX / ThreeDEnvironment.containerWidth) - 1;
            ThreeDEnvironment.mouseVector.y = 1 - 2 * (e.clientY / ThreeDEnvironment.containerHeight);

            var raycaster = ThreeDEnvironment.projector.pickingRay(ThreeDEnvironment.mouseVector.clone(), ThreeDEnvironment.camera),
				intersects = raycaster.intersectObjects(ThreeDEnvironment.changelableobjs.children);
            if (intersects.length > 0) {
                var intersection = intersects[0];
                var obj = intersection.object;
				
				//ThreeDEnvironment.objcontroller.setMode("translate");
                ThreeDEnvironment.objcontroller.attach(obj);
				ThreeDEnvironment.focusobject=obj;
            } else {
                ThreeDEnvironment.objcontroller.detach(obj);
            }
        }

        function onWindowResize() {
            ThreeDEnvironment.containerWidth = ThreeDEnvironment.container.clientWidth;
            ThreeDEnvironment.containerHeight = ThreeDEnvironment.container.clientHeight;
            ThreeDEnvironment.camera.aspect = window.innerWidth / window.innerHeight;
            ThreeDEnvironment.camera.updateProjectionMatrix();
            ThreeDEnvironment.renderer.setSize(window.innerWidth, window.innerHeight);
            render();
        }

		ThreeDEnvironment.objcontrol=function(keyCode){
			switch (keyCode) {
                case 81: // Q
                    ThreeDEnvironment.objcontroller.setSpace(ThreeDEnvironment.objcontroller.space == "local" ? "world" : "local");
                    break;
                case 77: // M
                    ThreeDEnvironment.objcontroller.setMode("translate");
                    break;
                case 69: // E
                    ThreeDEnvironment.objcontroller.setMode("rotate");
                    break;
                case 90: // z
                    ThreeDEnvironment.objcontroller.setMode("scale");
                    break;
                case 187:
                case 107: // +,=,num+
                    ThreeDEnvironment.objcontroller.setSize(ThreeDEnvironment.objcontroller.size + 0.1);
                    break;
                case 109:
                case 10: // -,_,num-
                    ThreeDEnvironment.objcontroller.setSize(Math.max(ThreeDEnvironment.objcontroller.size - 0.1, 0.1));
                    break;
				case 46: // Delete	
				ThreeDEnvironment.objcontroller.detach(ThreeDEnvironment.focusobject);
				ThreeDEnvironment.changelableobjs.remove( ThreeDEnvironment.focusobject);
                    //ThreeDEnvironment.scene.remove( ThreeDEnvironment.focusobject);
                    break;
				case 86: // V	
				var cloneobj =ThreeDEnvironment.focusobject.clone()
				ThreeDEnvironment.AddObject(cloneobj);
                    break;
            }
		}
		
        function onKeyDown(event) {
            ThreeDEnvironment.objcontrol(event.keyCode);
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            if (ThreeDEnvironment.controls != undefined) {
                ThreeDEnvironment.controls.update(ThreeDEnvironment.clock.getDelta());
            }
            if (ThreeDEnvironment.objcontroller != undefined) {
                ThreeDEnvironment.objcontroller.update();
            }
            ThreeDEnvironment.renderer.render(ThreeDEnvironment.scene, ThreeDEnvironment.camera);
        }