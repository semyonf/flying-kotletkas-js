/// <reference path="IForceFieldConfigItem.ts" />
/// <reference path="IEmitterConfigItem.ts" />

namespace Kotletkas {
  export interface ISandboxConfig {
    scene: THREE.Scene;
    systemRadius: number;
    emitter: IEmitterConfigItem;
    forceFields: Array<IForceFieldConfigItem>;
  }
}
