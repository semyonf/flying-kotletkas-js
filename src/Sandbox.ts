/// <reference path="Emitter.ts"/>
/// <reference path="AccelerationBehavior.ts"/>
/// <reference path="IParticleParams.ts"/>
/// <reference path="ISandboxConfig.ts"/>

namespace Kotletkas {
  export class Sandbox {
    private scene: THREE.Scene;
    private emitter: Emitter;
    private radius: number;
    private behaviors: Array<IParticleBehavior> = [];
    private particles: Array<Particle> = [];

    public prepareToRender(): void {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle: Particle = this.particles[i];
        particle.position.add(particle.velocity);
        particle.framesAlive++;

        if (
          particle.position.distanceTo(this.emitter.position) > this.radius ||
          particle.framesAlive > this.emitter.particleParams.lifespan
        ) {
          particle.framesAlive = 0;
          this.emitter.emitParticle(particle);
        }

        for (let i = this.behaviors.length - 1; i >= 0; i--) {
          const behavior: IParticleBehavior = this.behaviors[i];
          behavior.affectParticle(particle);
        }
      }
    }

    constructor(config: ISandboxConfig) {
      this.scene = config.scene;
      this.emitter = config.emitter;
      this.radius = config.radius;
      this.behaviors = config.behaviors;

      this.emitter.onNewParticleEmit = (newParticle: Particle) => {
        this.scene.add(newParticle);
        this.particles.push(newParticle);
      };

      this.emitter.init();
    }
  }
}
