import { Particle } from './Particle';
import { IParticleBehavior } from './IParticleBehavior';

export class AccelerationBehavior implements IParticleBehavior {
  strength: number = 1;
  affectParticle(particle: Particle): void {
    particle.velocity.divideScalar(1 + (0.005 * -this.strength));
  }

  constructor(strength: number) {
    this.strength = strength;
  }
}