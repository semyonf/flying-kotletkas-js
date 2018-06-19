/// <reference path="Particle.ts" />

namespace Kotletkas {
  export class Sandbox {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.Camera;
    private trails: boolean = false;
    private objects: Array<THREE.Mesh>;
    private particles: Array<Particle>

    constructor(config: object) {

    }
  }
}
