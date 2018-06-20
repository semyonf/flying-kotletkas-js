/// <reference path="Sandbox.ts" />

;(function($3, windowWidth, windowHeight) {
  const camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
  camera.position.set(30, 10, 30);

  const renderer = new $3.WebGLRenderer({antialias: true});
  renderer.setSize(windowWidth, windowHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const scene = new $3.Scene();
  camera.lookAt(scene.position);

  const k = new Kotletkas.Sandbox({
    scene,
    emitter: {
      name: 'mainEmitter',
      role: 'basic-emitter',
      position: {x: 0, y: 0, z: 0},
      geometry: new $3.PlaneBufferGeometry(5, 5),
      material: new $3.MeshNormalMaterial(),
      particleParams: {
        geometry: new THREE.CubeGeometry(0.5, 0.5, 0.5),
        material: new THREE.MeshBasicMaterial(),
        count: 5,
        lifespan: 180
      }
    },
    forceFields: [{
      name: 'cone',
      role: 'anti-attractor',
      position: {x: 0, y: 0, z: 15},
      strength: 1,
      geometry: new $3.ConeBufferGeometry(2, 5, 16, 32),
      material: new $3.MeshNormalMaterial()
    }]
  });

  (function animate() {
    k.prepareToRender();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
})(THREE, window.innerWidth, window.innerHeight);
