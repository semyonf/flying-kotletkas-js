///<reference path="Particle.ts"/>

namespace Kotletkas {
  export interface IParticleBehavior {
    strength?: number;
    affectParticle(particle: Particle): void;
  }
}