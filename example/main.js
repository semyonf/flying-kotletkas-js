// ;(function($3, windowWidth, windowHeight, undefined) { 'use strict';
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
//       geometry: new THREE.PlaneGeometry(10, 10),
//       material: new THREE.MeshNormalMaterial(),
//       particleParams: {
//         geometry: new $3.Geometry(),
//         material: new $3.Material(),
//         count: 100,
//         lifespan: 180
//       }
//     },
//     forces: [{
//       name: 'cone',
//       role: 'anti-attractor',
//       position: {x: 0, y: 0, z: 15},
//       strength: 1,
//       geometry: new $3.ConeGeometry(2, 5, 16, 32),
//       material: new $3.MeshNormalMaterial()
//     }]
//   });
// })(THREE, window.innerWidth, window.innerHeight);


// // ;(function($3, windowWidth, windowHeight, undefined) { 'use strict';
// //   const scene = new $3.Scene();

// //   const camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
// //   camera.position.set(30, 10, 30);
// //   camera.lookAt(scene.position);

// //   const renderer = new $3.WebGLRenderer({antialias: true});
// //   renderer.setSize(windowWidth, windowHeight);
// //   renderer.setPixelRatio(window.devicePixelRatio);
// //   document.body.appendChild(renderer.domElement);

// //   const
// //     emitter = new Kotletkas.BasicEmitter(scene, new $3.Mesh(
// //       new $3.PlaneGeometry(0.1, 0.1),
// //       new $3.MeshBasicMaterial({
// //         color: 0xffffff
// //       })
// //     ), {
// //       geometry: new $3.SphereGeometry(0.25, 12, 12),
// //       material: new $3.MeshBasicMaterial({color: 0xffffff})
// //     }),
// //     particleCount = 100,
// //     particles = [];

// //   const antiAttractor = new $3.Mesh(
// //     new $3.ConeBufferGeometry(2, 5, 16, 32),
// //     new $3.MeshNormalMaterial()
// //   );
// //   antiAttractor.position.set(0,0,20);
// //   antiAttractor.rotation.y = Math.PI / 2;
// //   scene.add(antiAttractor);

// //   for (let i = 0; i < particleCount; ++i) {
// //     const particle = emitter.emitParticle();
// //     particles.push(particle);
// //   }

// //   (function render() {
// //     for (let i in particles) {
// //       const particle = particles[i];
// //       particle.framesAlive++;
// //       if (particle.mesh.position.distanceTo(emitter.mesh.position) > 40) {
// //         emitter.emitParticle(particle);
// //       } else {
// //         const newVelocity = new $3.Vector3()
// //           .copy(particle.mesh.position)
// //           .sub(antiAttractor.position)
// //           .normalize()
// //           .multiplyScalar((particle.mesh.position
// //             .distanceTo(antiAttractor.position) ** -2
// //           ) * 0.4);

// //         particle.velocity.add(newVelocity);
// //         particle.mesh.position.add(particle.velocity);
// //       }
// //     }

// //     renderer.render(scene, camera);
// //     requestAnimationFrame(render);
// //   })();
// // })($3, window.innerWidth, window.innerHeight);
