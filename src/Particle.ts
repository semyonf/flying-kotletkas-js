namespace Kotletkas {
  export class Particle extends THREE.Mesh {
    velocity: THREE.Vector3;
    framesAlive: number = 0;

    constructor(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
    ) {
      super(geometry.clone(), material.clone());
      this.velocity = velocity;
    }
  }
}
