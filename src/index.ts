import { AccelerationBehavior } from './AccelerationBehavior';
import { AntiAttractor } from './AntiAttractor';
import { Emitter } from './Emitter';
import { Particle } from './Particle';
import { RandomNormalEmitter } from './RandomNormalEmitter';
import { VariableAngleEmitter } from './VariableAngleEmitter';
import { Sandbox } from './Sandbox';
import { Attractor } from './Attractor';

// @ts-ignore
window['Kotletkas'] = {
    AccelerationBehavior,
    AntiAttractor,
    Attractor,
    Emitter,
    Particle,
    RandomNormalEmitter,
    VariableAngleEmitter,
    Sandbox
}