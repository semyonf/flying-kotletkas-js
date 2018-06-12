/// <reference path="Particle.ts" />

class Emitter {
  private particleMesh: THREE.Mesh;
  private scene: THREE.Scene;

  emitParticle(prepare: (particle: Particle) => Particle, existingParticle?: Particle) {
    let particleToEmit: Particle;

    if (existingParticle) {
      particleToEmit = existingParticle;
    } else {
      particleToEmit = new Particle(this.particleMesh);
      this.scene.add(particleToEmit.mesh);
    }

    particleToEmit.mesh.position.set(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );

    return prepare(particleToEmit);
  }

  constructor(scene: THREE.Scene, public mesh: THREE.Mesh) {
    scene.add(this.mesh);
  }
}
