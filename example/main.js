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
    emitter = new Emitter(scene),
    antiAttractor = new AntiAttractor(scene),
    particleCount = 200,
    particlesDieAtFrame = 300,
    particles = [];

  for (let i = 0; i < particleCount; ++i) {
    const particle = emitter.emitParticle();
    particles.push(particle);
  }

  (function render() {
    for (let i in particles) {
      const particle = particles[i];
      const distance = particle
        .mesh
        .position
        .distanceTo(emitter.mesh.position);
      particle.material.color = new $.Color(
        `hsl(50, 100%, ${40 - distance << 0}%)`
      );
      particle.framesLived++;
      moveParticle(particle);
    }

    function moveParticle(particle) {
      if (
        particle.mesh.position.distanceTo(emitter.mesh.position) > 40 ||
        particle.framesLived > particlesDieAtFrame
      ) {
        emitter.emitParticle(particle);
      } else {
        const newVelocity = new $.Vector3()
          .copy(particle.mesh.position)
          .sub(antiAttractor.mesh.position)
          .normalize()
          .multiplyScalar((
            particle.mesh.position
              .distanceTo(antiAttractor.mesh.position) ** -2) * 0.4
           );

        particle.mesh.position.add(particle.velocity);
        particle.velocity.add(newVelocity);
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  })();

  function Emitter(scene, x = 0, y = 0, z = 0) {
    this.mesh = new $.Mesh(
      new $.PlaneBufferGeometry(0.1, 0.1),
      new $.MeshBasicMaterial({
        color: 0xffffff
      })
    );
    this.mesh.position.set(x, y, z);
    this.emitParticle = function(existingParticle) {
      const particle = existingParticle || new Particle();
      particle.mesh.position.set(0, 0, 0);
      particle.framesLived = (60 * Math.random()) << 0;
      particle.material.color = new $.Color(0x00ff00);
      particle.velocity
        .copy(new $.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5))
        .normalize()
        .divideScalar(2)
        .multiplyScalar(Math.random());

      return particle;
    };
    scene.add(this.mesh);

    return this;
  }

  function Particle(x, y, z) {
    this.velocity = new $.Vector3(0, 0, 0);
    this.geometry = new $.SphereBufferGeometry(.3, 12, 12);
    this.material = new $.MeshBasicMaterial({
      transparent: true,
      opacity: 0.9
    });
    this.framesLived = 0;
    this.mesh = new $.Mesh(
      this.geometry,
      this.material
    );
    this.mesh.position.set(x, y, z);
    scene.add(this.mesh);

    return this;
  }

  function AntiAttractor(scene, x = 0, y = 0, z = 20) {
    this.mesh = new $.Mesh(
      new $.ConeBufferGeometry(2, 5, 16, 32),
      new $.MeshNormalMaterial()
    );
    this.mesh.position.set(x, y, z);
    this.mesh.rotation.y = Math.PI / 2;
    scene.add(this.mesh);

    return this;
  }
})(THREE, window.innerWidth, window.innerHeight);
