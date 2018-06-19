namespace Kotletkas {
  export interface IForceField {
    strength: number;
    affectParticle(particle: Particle): void;
  }
}
