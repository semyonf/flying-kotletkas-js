import { Particle } from './Particle';

export interface IParticleBehavior {
  strength?: number;
  affectParticle(particle: Particle): void;
}