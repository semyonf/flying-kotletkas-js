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
        Emitter.prototype.onNewParticleEmit = function (newParticle) { };
        ;
        Emitter.prototype.onExistingParticleEmit = function (existingParticle) { };
        Emitter.prototype.init = function () {
            for (var i = this.particleParams.count; i > 0; i--) {
                this.emitParticle();
            }
        };
        Emitter.prototype.emitParticle = function (existingParticle) {
            var particleToEmit;
            if (existingParticle) {
                particleToEmit = existingParticle;
                this.onExistingParticleEmit(particleToEmit);
            }
            else {
                particleToEmit = new Kotletkas.Particle(this.particleParams.geometry, this.particleParams.material);
                this.onNewParticleEmit(particleToEmit);
            }
            particleToEmit.velocity = new THREE.Vector3(0, 0, Math.random());
            particleToEmit.position.set(this.position.x, this.position.y, this.position.z);
            return particleToEmit;
        };
        return Emitter;
    }(THREE.Mesh));
    Kotletkas.Emitter = Emitter;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var SlowingBehavior = (function () {
        function SlowingBehavior(strength) {
            this.strength = 1;
            this.strength = strength;
        }
        SlowingBehavior.prototype.affectParticle = function (particle) {
            particle.velocity.divideScalar(1 + (0.005 * this.strength));
        };
        return SlowingBehavior;
    }());
    Kotletkas.SlowingBehavior = SlowingBehavior;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Sandbox = (function () {
        function Sandbox(config) {
            var _this = this;
            this.behaviors = [];
            this.particles = [];
            this.scene = config.scene;
            this.emitter = config.emitter;
            this.radius = config.radius;
            this.behaviors = config.behaviors;
            this.emitter.onNewParticleEmit = function (newParticle) {
                _this.scene.add(newParticle);
                _this.particles.push(newParticle);
            };
            this.emitter.init();
        }
        Sandbox.prototype.prepareToRender = function () {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                var particle = this.particles[i];
                particle.position.add(particle.velocity);
                particle.framesAlive++;
                if (particle.position.distanceTo(this.emitter.position) > this.radius ||
                    particle.framesAlive > this.emitter.particleParams.lifespan) {
                    particle.framesAlive = 0;
                    this.emitter.emitParticle(particle);
                }
                for (var i_1 = this.behaviors.length - 1; i_1 >= 0; i_1--) {
                    var behavior = this.behaviors[i_1];
                    behavior.affectParticle(particle);
                }
            }
        };
        return Sandbox;
    }());
    Kotletkas.Sandbox = Sandbox;
})(Kotletkas || (Kotletkas = {}));
;
(function ($3, windowWidth, windowHeight) {
    var camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
    camera.position.set(30, 10, 30);
    var renderer = new $3.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    var scene = new $3.Scene();
    camera.lookAt(scene.position);
    var emitter = new Kotletkas.Emitter(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial(), {
        count: 10,
        lifespan: 180,
        geometry: new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
        material: new THREE.MeshNormalMaterial()
    });
    scene.add(emitter);
    var kotletkasConfig = {
        scene: scene,
        emitter: emitter,
        radius: 30,
        behaviors: [{
                affectParticle: function (particle) {
                }
            },
            new Kotletkas.SlowingBehavior(3)
        ]
    };
    var k = new Kotletkas.Sandbox(kotletkasConfig);
    (function animate() {
        k.prepareToRender();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();
})(THREE, window.innerWidth, window.innerHeight);
//# sourceMappingURL=flying-kotletkas.js.map