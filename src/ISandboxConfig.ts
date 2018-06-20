/// <reference path="IForceFieldConfigItem.ts" />
/// <reference path="IEmitterConfigItem.ts" />

namespace Kotletkas {
  export interface ISandboxConfig {
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    trails: boolean;
    emitter: IEmitterConfigItem;
    forceFields: Array<IForceFieldConfigItem>;
  }
}
