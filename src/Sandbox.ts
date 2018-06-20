/// <reference path="IParticleParams.ts" />
/// <reference path="Emitter.ts" />
/// <reference path="IConfigItem.ts" />
/// <reference path="IEmitterConfigItem.ts" />
/// <reference path="IForceFieldConfigItem.ts" />
/// <reference path="ISandboxConfig.ts" />
/// <reference path="IForce.ts" />
/// <reference path="SlowingForce.ts" />

namespace Kotletkas {
  export class Sandbox {
    private scene: THREE.Scene;
    private systemRadius: number;
    private emitter: Emitter;
    private particleLifeSpan: number;
    private forces: Array<IForce> = [];
    private particles: Array<Particle> = [];

    private createEmitter(e: IEmitterConfigItem): void {
      switch (e.role) {
        case "basic-emitter":
          this.emitter = new Emitter(
            e.geometry,
            e.material,
            e.particleParams
          );

          break;

        default:
          throw new Error('Unknown Emitter role!');

          break;
      }

      this.emitter.position.set(e.position.x, e.position.y, e.position.z);
      this.scene.add(this.emitter);
    }

    public prepareToRender(): void {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        const particle: Particle = this.particles[i];
        particle.position.add(particle.velocity);
        particle.framesAlive++;
        if (
          particle.position.distanceTo(this.emitter.position) > this.systemRadius ||
          particle.framesAlive > this.particleLifeSpan
        ) {
          particle.framesAlive = 0;
          this.emitter.emitParticle(particle);
        }

        for (var j = this.forces.length - 1; j >= 0; j--) {
          const force: IForce = this.forces[j];
          force.affectParticle(particle);
        }
      }
    }

    constructor(config: ISandboxConfig) {
      this.scene = config.scene;
      this.systemRadius = config.systemRadius;
      this.createEmitter(config.emitter);

      let newParticle: Particle;
      for (var i = 0; i < config.emitter.particleParams.count; ++i) {
        newParticle = this.emitter.emitParticle();
        this.scene.add(newParticle);
        this.particles.push(newParticle);
      }
      this.particleLifeSpan = config.emitter.particleParams.lifespan;

      this.forces.push(new SlowingForce());

      for (var i = config.forceFields.length - 1; i >= 0; i--) {
        // this.createForceField(config.forceFields[i]);
      }
    }
  }
}
