/// <reference path="Particle.ts" />
/// <reference path="IForce.ts" />
///
namespace Kotletkas {
  export class SlowingForce implements IForce {
    public strength: number = 1;
    affectParticle(particle: Particle): void {
      particle.velocity.divideScalar(1 + (0.005 * this.strength));
    }

    constructor() {

    }
  }
}
