/// <reference path="Particle.ts" />

namespace Kotletkas {
  export class Emitter {
    emitParticle(existingParticle?: Particle, prepare?: (particle: Particle) => Particle) {
      let particleToEmit: Particle;

      if (existingParticle) {
        particleToEmit = existingParticle;
      } else {
        particleToEmit = new Particle(this.particleParams);
        this.scene.add(particleToEmit.mesh);
      }

      particleToEmit.mesh.position.set(0, 0, 0);
      particleToEmit.velocity = new THREE.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5);

      if (prepare) {
        return prepare(particleToEmit);
      }

      return particleToEmit;
    }

    constructor(
      private scene: THREE.Scene,
      public mesh: THREE.Mesh,
      private particleParams: {geometry: THREE.Geometry, material: THREE.Material}
    ) {
        scene.add(this.mesh);
      }
  }
}
