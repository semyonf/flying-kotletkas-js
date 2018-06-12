"use strict";
var Kotletkas;
(function (Kotletkas) {
    var Particle = (function () {
        function Particle(particleParams) {
            this.framesAlive = 0;
            this.mesh = new THREE.Mesh(particleParams.geometry, particleParams.material);
        }
        return Particle;
    }());
    Kotletkas.Particle = Particle;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Emitter = (function () {
        function Emitter(scene, mesh, particleParams) {
            this.scene = scene;
            this.mesh = mesh;
            this.particleParams = particleParams;
            scene.add(this.mesh);
        }
        Emitter.prototype.emitParticle = function (existingParticle, prepare) {
            var particleToEmit;
            if (existingParticle) {
                particleToEmit = existingParticle;
            }
            else {
                particleToEmit = new Kotletkas.Particle(this.particleParams);
                this.scene.add(particleToEmit.mesh);
            }
            particleToEmit.mesh.position.set(0, 0, 0);
            particleToEmit.velocity = new THREE.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5);
            if (prepare) {
                return prepare(particleToEmit);
            }
            return particleToEmit;
        };
        return Emitter;
    }());
    Kotletkas.Emitter = Emitter;
})(Kotletkas || (Kotletkas = {}));
//# sourceMappingURL=flying-kotletkas.js.map