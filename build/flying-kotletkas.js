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
            var _this = _super.call(this, geometry.clone(), material.clone()) || this;
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
    var AccelerationBehavior = (function () {
        function AccelerationBehavior(strength) {
            this.strength = 1;
            this.strength = strength;
        }
        AccelerationBehavior.prototype.affectParticle = function (particle) {
            particle.velocity.divideScalar(1 + (0.005 * -this.strength));
        };
        return AccelerationBehavior;
    }());
    Kotletkas.AccelerationBehavior = AccelerationBehavior;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var AntiAttractor = (function (_super) {
        __extends(AntiAttractor, _super);
        function AntiAttractor(geometry, material, strength) {
            if (strength === void 0) { strength = 1; }
            var _this = _super.call(this, geometry, material) || this;
            _this.strength = strength;
            return _this;
        }
        AntiAttractor.prototype.affectParticle = function (particle) {
            var newVelocity = new THREE.Vector3()
                .copy(particle.position)
                .sub(this.position)
                .normalize()
                .multiplyScalar((Math.pow(particle.position
                .distanceTo(this.position), -2)) * 0.4);
            particle.velocity.add(newVelocity);
        };
        return AntiAttractor;
    }(THREE.Mesh));
    Kotletkas.AntiAttractor = AntiAttractor;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Attractor = (function (_super) {
        __extends(Attractor, _super);
        function Attractor(geometry, material, strength) {
            var _this = _super.call(this, geometry, material) || this;
            _this.strength = strength;
            return _this;
        }
        Attractor.prototype.affectParticle = function (particle) {
            var newVelocity = new THREE.Vector3()
                .copy(particle.position)
                .sub(this.position)
                .normalize()
                .multiplyScalar((Math.pow(particle.position
                .distanceTo(this.position), -2)) * 0.5);
            particle.velocity.sub(newVelocity);
        };
        return Attractor;
    }(THREE.Mesh));
    Kotletkas.Attractor = Attractor;
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
        Emitter.prototype.getInitialVelocity = function () {
            return new THREE.Vector3(0, 0, Math.random() / 3);
        };
        Emitter.prototype.onAnyParticleEmit = function (particleToEmit) {
        };
        Emitter.prototype.onNewParticleEmit = function (newParticle) {
        };
        Emitter.prototype.onExistingParticleEmit = function (existingParticle) {
        };
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
            particleToEmit.velocity = this.getInitialVelocity();
            particleToEmit.position.set(this.position.x, this.position.y, this.position.z);
            this.onAnyParticleEmit(particleToEmit);
            return particleToEmit;
        };
        return Emitter;
    }(THREE.Mesh));
    Kotletkas.Emitter = Emitter;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var RandomNormalEmitter = (function (_super) {
        __extends(RandomNormalEmitter, _super);
        function RandomNormalEmitter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RandomNormalEmitter.prototype.onAnyParticleEmit = function (particleToEmit) {
            var emitterGeometry;
            if (this.geometry instanceof THREE.BufferGeometry) {
                emitterGeometry = new THREE.Geometry().fromBufferGeometry(this.geometry);
            }
            else {
                emitterGeometry = this.geometry;
            }
            var numberOfFaces = (Math.random() * (emitterGeometry.faces.length - 1)) << 0;
            var face = emitterGeometry.faces[numberOfFaces];
            var xx = [], yy = [], zz = [];
            var points = [face.a, face.b, face.c];
            for (var i in points) {
                xx.push(emitterGeometry.vertices[points[i]].x);
                yy.push(emitterGeometry.vertices[points[i]].y);
                zz.push(emitterGeometry.vertices[points[i]].z);
            }
            xx = [Math.max.apply(null, xx), Math.min.apply(null, xx)];
            yy = [Math.max.apply(null, yy), Math.min.apply(null, yy)];
            zz = [Math.max.apply(null, zz), Math.min.apply(null, zz)];
            particleToEmit.position.set(Math.random() * (xx[0] - xx[1]) + (xx[1]), Math.random() * (yy[0] - yy[1]) + (yy[1]), Math.random() * (zz[0] - zz[1]) + (zz[1]));
        };
        return RandomNormalEmitter;
    }(Kotletkas.Emitter));
    Kotletkas.RandomNormalEmitter = RandomNormalEmitter;
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
var Kotletkas;
(function (Kotletkas) {
    var VariableAngleEmitter = (function (_super) {
        __extends(VariableAngleEmitter, _super);
        function VariableAngleEmitter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VariableAngleEmitter.prototype.getInitialVelocity = function () {
            return new THREE.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5);
        };
        return VariableAngleEmitter;
    }(Kotletkas.Emitter));
    Kotletkas.VariableAngleEmitter = VariableAngleEmitter;
})(Kotletkas || (Kotletkas = {}));
//# sourceMappingURL=flying-kotletkas.js.map