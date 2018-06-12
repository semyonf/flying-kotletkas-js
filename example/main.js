;(function($, windowWidth, windowHeight, undefined) { 'use strict';
  const scene = new $.Scene();

  const camera = new $.PerspectiveCamera(80, windowWidth / windowHeight);
  camera.position.set(30, 10, 30);
  camera.lookAt(scene.position);

  const renderer = new $.WebGLRenderer({antialias: true});
  renderer.setSize(windowWidth, windowHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  const
    emitter = new Kotletkas.Emitter(scene, new $.Mesh(
      new $.PlaneGeometry(0.1, 0.1),
      new $.MeshBasicMaterial({
        color: 0xffffff
      })
    ), {
      geometry: new $.SphereGeometry(0.25, 12, 12),
      material: new $.MeshBasicMaterial({color: 0xffffff})
    }),
    particleCount = 100,
    particles = [];

  const antiAttractor = new $.Mesh(
    new $.ConeBufferGeometry(2, 5, 16, 32),
    new $.MeshNormalMaterial()
  );
  antiAttractor.position.set(0,0,20);
  antiAttractor.rotation.y = Math.PI / 2;
  scene.add(antiAttractor);

  for (let i = 0; i < particleCount; ++i) {
    const particle = emitter.emitParticle();
    particles.push(particle);
  }

  (function render() {
    for (let i in particles) {
      const particle = particles[i];
      particle.framesAlive++;
      if (particle.mesh.position.distanceTo(emitter.mesh.position) > 40) {
        emitter.emitParticle(particle);
      } else {
        const newVelocity = new $.Vector3()
          .copy(particle.mesh.position)
          .sub(antiAttractor.position)
          .normalize()
          .multiplyScalar((particle.mesh.position
            .distanceTo(antiAttractor.position) ** -2
          ) * 0.4);

        particle.velocity.add(newVelocity);
        particle.mesh.position.add(particle.velocity);
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  })();
})(THREE, window.innerWidth, window.innerHeight);
