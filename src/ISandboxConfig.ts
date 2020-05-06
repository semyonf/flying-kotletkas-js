import { Emitter } from './Emitter';
import { IParticleBehavior } from './IParticleBehavior';
import * as THREE from 'three';

export interface ISandboxConfig {
  scene: THREE.Scene;
  emitter: Emitter;
  radius: number;
  behaviors: Array<IParticleBehavior>;
}
