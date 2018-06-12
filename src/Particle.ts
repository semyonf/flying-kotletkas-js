/// <reference path="Emitter.ts" />

namespace Kotletkas {
  export class Particle {
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    framesAlive: number = 0;

    constructor(
      particleParams: {geometry: THREE.Geometry, material: THREE.Material}
    ) {
      this.mesh = new THREE.Mesh(
        particleParams.geometry,
        particleParams.material
      );
    }
  }
}
