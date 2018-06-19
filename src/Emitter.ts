/// <reference path="Particle.ts" />

namespace Kotletkas {
  export class Emitter extends THREE.Mesh {
    public scene: THREE.Scene;
    public particleParams: {geometry: THREE.Geometry, material: THREE.Material}
    public emitParticle(
      existingParticle?: Particle,
      prepare?: (particle: Particle) => Particle
    ) {
      let particleToEmit: Particle;

      if (existingParticle) {
        particleToEmit = existingParticle;
      } else {
        particleToEmit = new Particle(
          this.particleParams.geometry,
          this.particleParams.material
        );

        this.scene.add(particleToEmit);
      }

      particleToEmit.position.set(0, 0, 0);
      particleToEmit.velocity = new THREE.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5);

      if (prepare) {
        return prepare(particleToEmit);
      }

      return particleToEmit;
    }

    constructor(
      geometry: THREE.Geometry,
      material: THREE.Material,
      scene: THREE.Scene,
      particleParams: {geometry: THREE.Geometry, material: THREE.Material}
    ) {
      super(geometry, material);
      this.scene = scene;
      this.particleParams = particleParams;
    }
  }
}
