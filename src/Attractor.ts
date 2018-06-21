///<reference path="IParticleBehavior.ts"/>

namespace Kotletkas {
  export class Attractor extends THREE.Mesh implements IParticleBehavior {
    strength: number;

    affectParticle(particle: Kotletkas.Particle): void {
      const newVelocity = new THREE.Vector3()
        .copy(particle.position)
        .sub(this.position)
        .normalize()
        .multiplyScalar((
          particle.position
            .distanceTo(this.position) ** -2) * 0.5
        );

      particle.velocity.sub(newVelocity);
    }

    constructor(
      geometry: THREE.Geometry | THREE.BufferGeometry,
      material: THREE.Material | THREE.Material[],
      strength: number
    ) {
      super(geometry, material);
      this.strength = strength;
    }
  }
}