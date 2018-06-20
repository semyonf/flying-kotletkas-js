/// <reference path="Particle.ts" />
/// <reference path="IParticleParams.ts" />

namespace Kotletkas {
  export class Emitter extends THREE.Mesh {
    public particleParams: IParticleParams

    public onNewParicleEmit(newParticle: Particle) {

    }

    public onExistingParicleEmit(existingParticle: Particle) {

    }

    emitParticle(existingParticle?: Particle) {
      let particleToEmit: Particle;

      if (existingParticle) {
        particleToEmit = existingParticle;
        this.onExistingParicleEmit(particleToEmit);
      } else {
        particleToEmit = new Particle(
          this.particleParams.geometry,
          this.particleParams.material
        );
        particleToEmit.velocity = new THREE.Vector3(0, 0, 0.5 * Math.random());
        this.onNewParicleEmit(particleToEmit);
      }

      particleToEmit.position.set(
        this.position.x, this.position.y, this.position.z
      );

      return particleToEmit;
    }

    constructor(
      geometry: THREE.Geometry|THREE.BufferGeometry,
      material: THREE.Material,
      particleParams: IParticleParams,
    ) {
      super(geometry, material);
      this.particleParams = particleParams;
    }
  }
}
