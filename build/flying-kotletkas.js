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
            for (var i = config.forceFields.length - 1; i >= 0; i--) {
            }
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
;
(function ($3, windowWidth, windowHeight) {
    var camera = new $3.PerspectiveCamera(80, windowWidth / windowHeight);
    camera.position.set(30, 10, 30);
    var renderer = new $3.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    new Kotletkas.Sandbox({
        camera: camera,
        renderer: renderer,
        trails: false,
        emitter: {
            name: 'mainEmitter',
            role: 'basic-emitter',
            position: { x: 0, y: 0, z: 0 },
            geometry: new $3.PlaneBufferGeometry(15, 15),
            material: new $3.MeshNormalMaterial(),
            particleParams: {
                geometry: new THREE.Geometry(),
                material: new THREE.Material(),
                count: 100,
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
})(THREE, window.innerWidth, window.innerHeight);
//# sourceMappingURL=flying-kotletkas.js.map