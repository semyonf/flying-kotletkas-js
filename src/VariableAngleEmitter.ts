import { Emitter } from './Emitter';
import * as THREE from 'three';

export class VariableAngleEmitter extends Emitter {
  getInitialVelocity(): THREE.Vector3 {
    return new THREE.Vector3(Math.random() / 10 - 0.035, Math.random() / 10 - 0.035, 0.5);
  }
}