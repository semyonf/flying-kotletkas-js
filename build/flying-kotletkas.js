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
        return Emitter;
    }(THREE.Mesh));
    Kotletkas.Emitter = Emitter;
})(Kotletkas || (Kotletkas = {}));
var Kotletkas;
(function (Kotletkas) {
    var Sandbox = (function () {
        function Sandbox(config) {
            this.scene = new THREE.Scene();
            this.trails = false;
            this.camera = config.camera;
            this.camera.lookAt(this.scene.position);
            this.renderer = config.renderer;
            this.trails = config.trails;
            this.createEmitter(config.emitter);
            this.renderer.render(this.scene, this.camera);
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
            this.scene.add(this.emitter);
        };
        return Sandbox;
    }());
    Kotletkas.Sandbox = Sandbox;
})(Kotletkas || (Kotletkas = {}));
//# sourceMappingURL=flying-kotletkas.js.map