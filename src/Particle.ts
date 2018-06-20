namespace Kotletkas {
  export class Particle extends THREE.Mesh {
    public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    public framesAlive: number = 0;

    constructor(
      geometry: THREE.Geometry,
      material: THREE.Material,
      velocity: THREE.Vector3
    ) {
      super(geometry, material);
      this.velocity = velocity;
    }
  }
}
