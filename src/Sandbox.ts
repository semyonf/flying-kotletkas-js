/// <reference path="IParticleParams.ts" />
/// <reference path="Emitter.ts" />
/// <reference path="IConfigItem.ts" />
/// <reference path="IEmitterConfigItem.ts" />
/// <reference path="IForceFieldConfigItem.ts" />
/// <reference path="ISandboxConfig.ts" />

namespace Kotletkas {
  export class Sandbox {
    private scene: THREE.Scene;
    private emitter: Emitter;
    private statics: Array<THREE.Mesh> = [];
    private particles: Array<Particle> = [];

    private createEmitter(e: IEmitterConfigItem): void {
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

    public prepareToRender(): void {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        // every forcefield should affect every particle here
        this.particles[i].position.add(this.particles[i].velocity);
      }
    }

    constructor(config: ISandboxConfig) {
      this.scene = config.scene;
      this.createEmitter(config.emitter);

      let newParticle: Particle;
      for (var i = 0; i < config.emitter.particleParams.count; ++i) {
        newParticle = this.emitter.emitParticle();
        this.scene.add(newParticle);
        this.particles.push(newParticle);
      }

      for (var i = config.forceFields.length - 1; i >= 0; i--) {
        // this.createForceField(config.forceFields[i]);
      }
    }
  }
}
