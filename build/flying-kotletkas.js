"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kotletkas;
(function (Kotletkas) {
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle(geometry, material, velocity) {
            if (velocity === void 0) { velocity = new THREE.Vector3(0, 0, 0); }
            var _this = _super.call(this, geometry, material) || this;
            _this.framesAlive = 0;
            _this.velocity = velocity;
            return _this;
        }
        return Particle;
    }(THREE.Mesh));
    Kotletkas.Particle = Particle;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Emitter = (function (_super) {
        __extends(Emitter, _super);
        function Emitter(geometry, material, particleParams) {
            var _this = _super.call(this, geometry, material) || this;
            _this.particleParams = particleParams;
            return _this;
        }
        Emitter.prototype.onNewParicleEmit = function (newParticle) {
            newParticle.velocity = new THREE.Vector3(0, 0, 0.5 * Math.random());
        };
        Emitter.prototype.onExistingParicleEmit = function (existingParticle) {
            existingParticle.velocity = new THREE.Vector3(0, 0, Math.random());
        };
        Emitter.prototype.emitParticle = function (existingParticle) {
            var particleToEmit;
            if (existingParticle) {
                particleToEmit = existingParticle;
                this.onExistingParicleEmit(particleToEmit);
            }
            else {
                particleToEmit = new Kotletkas.Particle(this.particleParams.geometry, this.particleParams.material);
                this.onNewParicleEmit(particleToEmit);
            }
            particleToEmit.position.set(this.position.x, this.position.y, this.position.z);
            return particleToEmit;
        };
        return Emitter;
    }(THREE.Mesh));
    Kotletkas.Emitter = Emitter;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Sandbox = (function () {
        function Sandbox(config) {
            this.statics = [];
            this.particles = [];
            this.scene = config.scene;
            this.createEmitter(config.emitter);
            var newParticle;
            for (var i = 0; i < config.emitter.particleParams.count; ++i) {
                newParticle = this.emitter.emitParticle();
                this.scene.add(newParticle);
                this.particles.push(newParticle);
            }
            this.particleLifeSpan = config.emitter.particleParams.lifespan;
            for (var i = config.forceFields.length - 1; i >= 0; i--) {
            }
        }
        Sandbox.prototype.createEmitter = function (e) {
            switch (e.role) {
                case "basic-emitter":
                    this.emitter = new Kotletkas.Emitter(e.geometry, e.material, e.particleParams);
                    break;
                default:
                    throw new Error('Unknown Emitter role!');
                    break;
            }
            this.emitter.position.set(e.position.x, e.position.y, e.position.z);
            this.scene.add(this.emitter);
        };
        Sandbox.prototype.prepareToRender = function () {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                var particle = this.particles[i];
                particle.position.add(particle.velocity);
                particle.framesAlive++;
                if (particle.position.distanceTo(this.emitter.position) > 20 ||
                    particle.framesAlive > this.particleLifeSpan) {
                    particle.framesAlive = 0;
                    this.emitter.emitParticle(particle);
                }
            }
        };
        return Sandbox;
    }());
    Kotletkas.Sandbox = Sandbox;
})(Kotletkas || (Kotletkas = {}));
;
(function ($3, windowWidth, windowHeight) {
    var camera = new $3.PerspectiveCamera(100, windowWidth / windowHeight);
    camera.position.set(30, 10, 30);
    var renderer = new $3.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    var scene = new $3.Scene();
    camera.lookAt(scene.position);
    var k = new Kotletkas.Sandbox({
        scene: scene,
        emitter: {
            name: 'mainEmitter',
            role: 'basic-emitter',
            position: { x: 0, y: 0, z: 0 },
            geometry: new $3.PlaneBufferGeometry(5, 5),
            material: new $3.MeshNormalMaterial(),
            particleParams: {
                geometry: new THREE.CubeGeometry(0.5, 0.5, 0.5),
                material: new THREE.MeshBasicMaterial(),
                count: 5,
                lifespan: 180
            }
        },
        forceFields: [{
                name: 'cone',
                role: 'anti-attractor',
                position: { x: 0, y: 0, z: 15 },
                strength: 1,
                geometry: new $3.ConeBufferGeometry(2, 5, 16, 32),
                material: new $3.MeshNormalMaterial()
            }]
    });
    (function animate() {
        k.prepareToRender();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
})(THREE, window.innerWidth, window.innerHeight);
//# sourceMappingURL=flying-kotletkas.js.map