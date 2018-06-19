/// <reference path="Particle.ts" />
/// <reference path="IParticleParams.ts" />
/// <reference path="Emitter.ts" />

namespace Kotletkas {
  interface IConfigItem {
    name?: string;
    role: string;
    position?: {x: number, y: number, z: number}
    geometry: THREE.Geometry|THREE.BufferGeometry;
    material: THREE.Material;
  }

  interface IEmitterConfigItem extends IConfigItem {
    particleParams: IParticleParams;
  }

  interface IForceFieldConfigItem extends IConfigItem {
    strength: number;
  }

  interface ISandboxConfig {
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    trails: boolean;
    emitter: IEmitterConfigItem;
    forceFields: Array<IForceFieldConfigItem>;
  }

  export class Sandbox {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.Camera;
    private renderer: THREE.Renderer;
    private emitter: Emitter;
    private trails: boolean = false;
    private statics: Array<THREE.Mesh>;
    private particles: Array<Particle>;

    private createEmitter(e: IEmitterConfigItem) {
      switch (e.role) {
        case "basic-emitter":
          this.emitter = new Emitter(
            e.geometry,
            e.material,
            e.particleParams);
          break;

        default:
          throw new Error('Unknown Emitter role!');

          break;
      }

      this.scene.add(this.emitter);
    }

    constructor(config: ISandboxConfig) {
      this.camera = config.camera;
      this.camera.lookAt(this.scene.position);
      this.renderer = config.renderer;
      this.trails = config.trails;

      this.createEmitter(config.emitter);
      // this.scene.add(new THREE.Mesh(
      //   new THREE.PlaneGeometry(10, 10),
      //   new THREE.MeshNormalMaterial()
      // ));

      // for (var i = config.forceFields.length - 1; i >= 0; i--) {
      //   // this.createForceField(config.forceFields[i]);
      // }

      this.renderer.render(this.scene, this.camera);
    }
  }
}
