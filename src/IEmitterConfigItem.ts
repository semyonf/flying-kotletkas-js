/// <reference path="IConfigItem.ts" />
/// <reference path="IParticleParams.ts" />

namespace Kotletkas {
  export interface IEmitterConfigItem extends IConfigItem {
    particleParams: IParticleParams;
  }
}
