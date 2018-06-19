/// <reference path="Particle.ts" />
/// <reference path="IParticleParams.ts" />

namespace Kotletkas {
  export class Emitter extends THREE.Mesh {
    public particleParams: IParticleParams

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
