"use strict";
var Particle = (function () {
    function Particle(mesh) {
        this.mesh = mesh;
    }
    return Particle;
}());
var Emitter = (function () {
    function Emitter(scene, mesh) {
        this.mesh = mesh;
        scene.add(this.mesh);
    }
    Emitter.prototype.emitParticle = function (prepare, existingParticle) {
        var particleToEmit;
        if (existingParticle) {
            particleToEmit = existingParticle;
        }
        else {
            particleToEmit = new Particle(this.particleMesh);
            this.scene.add(particleToEmit.mesh);
        }
        particleToEmit.mesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
        return prepare(particleToEmit);
    };
    return Emitter;
}());
//# sourceMappingURL=flying-kotletkas.js.map