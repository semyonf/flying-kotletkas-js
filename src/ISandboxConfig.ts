///<reference path="Emitter.ts"/>
///<reference path="IParticleBehavior.ts"/>

namespace Kotletkas {
  export interface ISandboxConfig {
    scene: THREE.Scene;
    emitter: Emitter;
    radius: number;
    behaviors: Array<IParticleBehavior>;
  }
}
