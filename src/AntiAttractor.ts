/// <reference path="Particle.ts" />
/// <reference path="IForceField.ts" />

namespace Kotletkas {
  export class AntiAttractor extends THREE.Mesh implements IForceField {
    public strength: number;
    public affectParticle(particle: Particle): void {
      // Do some math
      this.position;
    }

    constructor(
      geometry: THREE.Geometry,
      material: THREE.Material,
      name: string = ''
    ) {
      super(geometry, material);
      this.name = name;
    }
  }
}
