declare class Particle {
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    framesAlive: number;
    constructor(mesh: THREE.Mesh);
}
declare class Emitter {
    mesh: THREE.Mesh;
    private particleMesh;
    private scene;
    emitParticle(prepare: (particle: Particle) => Particle, existingParticle?: Particle): Particle;
    constructor(scene: THREE.Scene, mesh: THREE.Mesh);
}
