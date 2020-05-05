import { Particle } from './Particle';
import { IParticleParams } from './IParticleParams';
import * as THREE from 'three';

export class Emitter extends THREE.Mesh {
  public particleParams: IParticleParams;

  // @todo refactoring
  getInitialVelocity(): THREE.Vector3 {
    return new THREE.Vector3(0, 0, Math.random() / 3);
  }

  onAnyParticleEmit(particleToEmit: Particle) {
  }

  onNewParticleEmit(newParticle: Particle) {
  }

  onExistingParticleEmit(existingParticle: Particle) {
  }

  init() {
    for (let i = this.particleParams.count; i > 0; i--) {
      this.emitParticle();
    }
  }

  emitParticle(existingParticle?: Particle) {
    let particleToEmit: Particle;

    if (existingParticle) {
      particleToEmit = existingParticle;
      this.onExistingParticleEmit(particleToEmit);
    } else {
      particleToEmit = new Particle(
        this.particleParams.geometry,
        this.particleParams.material
      );
      this.onNewParticleEmit(particleToEmit);
    }

    particleToEmit.velocity = this.getInitialVelocity();
    particleToEmit.position.set(
      this.position.x, this.position.y, this.position.z
    );

    this.onAnyParticleEmit(particleToEmit);

    return particleToEmit;
  }

  constructor(
    geometry: THREE.Geometry | THREE.BufferGeometry,
    material: THREE.Material,
    particleParams: IParticleParams,
  ) {
    super(geometry, material);
    this.particleParams = particleParams;
  }
}