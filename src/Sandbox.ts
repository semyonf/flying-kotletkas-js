/// <reference path="IParticleParams.ts" />
/// <reference path="Emitter.ts" />
/// <reference path="IConfigItem.ts" />
/// <reference path="IEmitterConfigItem.ts" />
/// <reference path="IForceFieldConfigItem.ts" />
/// <reference path="ISandboxConfig.ts" />

namespace Kotletkas {
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

      for (var i = config.forceFields.length - 1; i >= 0; i--) {
        // this.createForceField(config.forceFields[i]);
      }

      this.renderer.render(this.scene, this.camera);
    }
  }
}
