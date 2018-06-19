// /// <reference path="Sandbox.ts" />

// ;(function($3, windowWidth, windowHeight) {
//   const camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
//   camera.position.set(30, 10, 30);

//   const renderer = new $3.WebGLRenderer({antialias: true});
//   renderer.setSize(windowWidth, windowHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   document.body.appendChild(renderer.domElement);

//   new Kotletkas.Sandbox({
//     camera,
//     renderer,
//     trails: false,
//     emitter: {
//       name: 'mainEmitter',
//       role: 'basic-emitter',
//       position: {x: 0, y: 0, z: 0},
//       geometry: new $3.PlaneGeometry(0.1, 0.1),
//       material: new THREE.Material,
//       particleParams: {
//         geometry: new THREE.Geometry,
//         material: new THREE.Material,
//         count: 100,
//         lifespan: 180
//       }
//     },
//     forceFields: [{
//       name: 'cone',
//       role: 'anti-attractor',
//       position: {x: 0, y: 0, z: 15},
//       strength: 1,
//       geometry: new $3.ConeBufferGeometry(2, 5, 16, 32),
//       material: new $3.MeshNormalMaterial()
//     }]
//   });
// })(THREE, window.innerWidth, window.innerHeight);
