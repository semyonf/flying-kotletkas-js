declare namespace Kotletkas {
    class Particle {
        mesh: THREE.Mesh;
        velocity: THREE.Vector3;
        framesAlive: number;
        constructor(particleParams: {
            geometry: THREE.Geometry;
            material: THREE.Material;
        });
    }
}
declare namespace Kotletkas {
    class Emitter {
        private scene;
        mesh: THREE.Mesh;
        private particleParams;
        emitParticle(existingParticle?: Particle, prepare?: (particle: Particle) => Particle): Particle;
        constructor(scene: THREE.Scene, mesh: THREE.Mesh, particleParams: {
            geometry: THREE.Geometry;
            material: THREE.Material;
        });
    }
}
