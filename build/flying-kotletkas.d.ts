declare namespace Kotletkas {
    class Particle extends THREE.Mesh {
        velocity: THREE.Vector3;
        framesAlive: number;
        constructor(geometry: THREE.Geometry, material: THREE.Material, velocity?: THREE.Vector3);
    }
}
declare namespace Kotletkas {
    interface IParticleParams {
        geometry: THREE.Geometry;
        material: THREE.Material;
        count: number;
        lifespan: number;
    }
}
declare namespace Kotletkas {
    class Emitter extends THREE.Mesh {
        particleParams: IParticleParams;
        onNewParicleEmit(newParticle: Particle): void;
        onExistingParicleEmit(existingParticle: Particle): void;
        emitParticle(existingParticle?: Particle): Particle;
        constructor(geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material, particleParams: IParticleParams);
    }
}
declare namespace Kotletkas {
    interface IConfigItem {
        role: string;
        geometry: THREE.Geometry | THREE.BufferGeometry;
        material: THREE.Material;
        name?: string;
        position?: {
            x: number;
            y: number;
            z: number;
        };
    }
}
declare namespace Kotletkas {
    interface IEmitterConfigItem extends IConfigItem {
        particleParams: IParticleParams;
    }
}
declare namespace Kotletkas {
    interface IForceFieldConfigItem extends IConfigItem {
        strength: number;
    }
}
declare namespace Kotletkas {
    interface ISandboxConfig {
        scene: THREE.Scene;
        emitter: IEmitterConfigItem;
        forceFields: Array<IForceFieldConfigItem>;
    }
}
declare namespace Kotletkas {
    class Sandbox {
        private scene;
        private emitter;
        private statics;
        private particles;
        private createEmitter;
        prepareToRender(): void;
        constructor(config: ISandboxConfig);
    }
}
