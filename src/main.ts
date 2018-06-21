;(function ($3, windowWidth, windowHeight) {
  const camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
  camera.position.set(30, 10, 30);

  const renderer = new $3.WebGLRenderer({antialias: true});
  renderer.setSize(windowWidth, windowHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const scene = new $3.Scene();
  camera.lookAt(scene.position);

  const emitter = new Kotletkas.Emitter(
    new THREE.PlaneGeometry(10,10),
    new THREE.MeshBasicMaterial(),
    {
      count: 10,
      lifespan: 180,
      geometry: new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
      material: new THREE.MeshNormalMaterial()
    }
  );
  scene.add(emitter);

  const antiAttractor = new Kotletkas.AntiAttractor(
    new $3.ConeBufferGeometry(2, 5, 16, 32),
    new $3.MeshNormalMaterial()
  );
  antiAttractor.position.set(0, 0, 20);
  scene.add(antiAttractor);

  const kotletkasConfig = {
    scene,
    emitter,
    radius: 30,
    behaviors: [{
      affectParticle: function (particle: Kotletkas.Particle) {

      }
    },
      new Kotletkas.SlowingBehavior(3),
      antiAttractor
    ],
    // forces: []
  };

  const k = new Kotletkas.Sandbox(kotletkasConfig);

  (function animate() {
    k.prepareToRender();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
})(THREE, window.innerWidth, window.innerHeight);
