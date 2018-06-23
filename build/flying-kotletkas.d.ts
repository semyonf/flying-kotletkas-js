declare namespace Kotletkas {
    class Particle extends THREE.Mesh {
        velocity: THREE.Vector3;
        framesAlive: number;
        constructor(geometry: THREE.BufferGeometry, material: THREE.Material, velocity?: THREE.Vector3);
    }
}
declare namespace Kotletkas {
    interface IParticleBehavior {
        strength?: number;
        affectParticle(particle: Particle): void;
    }
}
declare namespace Kotletkas {
    class AccelerationBehavior implements IParticleBehavior {
        strength: number;
        affectParticle(particle: Particle): void;
        constructor(strength: number);
    }
}
declare namespace Kotletkas {
    class AntiAttractor extends THREE.Mesh implements IParticleBehavior {
        strength: number;
        affectParticle(particle: Kotletkas.Particle): void;
        constructor(geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material | THREE.Material[], strength?: number);
    }
}
declare namespace Kotletkas {
    class Attractor extends THREE.Mesh implements IParticleBehavior {
        strength: number;
        affectParticle(particle: Kotletkas.Particle): void;
        constructor(geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material | THREE.Material[], strength: number);
    }
}
declare namespace Kotletkas {
    interface IParticleParams {
        count: number;
        lifespan: number;
        geometry: THREE.BufferGeometry;
        material: THREE.Material;
    }
}
declare namespace Kotletkas {
    class Emitter extends THREE.Mesh {
        particleParams: IParticleParams;
        getInitialVelocity(): THREE.Vector3;
        onAnyParticleEmit(particleToEmit: Kotletkas.Particle): void;
        onNewParticleEmit(newParticle: Particle): void;
        onExistingParticleEmit(existingParticle: Particle): void;
        init(): void;
        emitParticle(existingParticle?: Particle): Particle;
        constructor(geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material, particleParams: IParticleParams);
    }
}
declare namespace Kotletkas {
    interface ISandboxConfig {
        scene: THREE.Scene;
        emitter: Emitter;
        radius: number;
        behaviors: Array<IParticleBehavior>;
    }
}
declare namespace Kotletkas {
    class RandomNormalEmitter extends Emitter {
        onAnyParticleEmit(particleToEmit: Kotletkas.Particle): void;
    }
}
declare namespace Kotletkas {
    class Sandbox {
        private scene;
        private emitter;
        private radius;
        private behaviors;
        private particles;
        prepareToRender(): void;
        constructor(config: ISandboxConfig);
    }
}
declare namespace Kotletkas {
    class VariableAngleEmitter extends Emitter {
        getInitialVelocity(): THREE.Vector3;
    }
}
