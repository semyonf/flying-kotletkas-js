/// <reference path="Emitter.ts" />

class Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  framesAlive: number;

  constructor(mesh: THREE.Mesh) {
    this.mesh = mesh;
  }
}
