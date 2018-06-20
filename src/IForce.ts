/// <reference path="Particle.ts" />

namespace Kotletkas {
  export interface IForce {
    strength: number;
    affectParticle(particle: Particle): void;
  }
}
