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
        constructor(geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material, particleParams: IParticleParams);
    }
}
declare namespace Kotletkas {
    interface IConfigItem {
        name?: string;
        role: string;
        position?: {
            x: number;
            y: number;
            z: number;
        };
        geometry: THREE.Geometry | THREE.BufferGeometry;
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
    class Sandbox {
        private scene;
        private camera;
        private renderer;
        private emitter;
        private trails;
        private statics;
        private particles;
        private createEmitter;
        constructor(config: ISandboxConfig);
    }
}
