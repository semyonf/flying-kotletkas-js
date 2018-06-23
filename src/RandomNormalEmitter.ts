/*
 * MIT License [https://opensource.org/licenses/MIT]
 * Copyright (c) 2018 Semyon Fomin
 *
 * Created: 6/23/18 8:40 PM
 */

///<reference path="Emitter.ts"/>
///<reference path="Particle.ts"/>

namespace Kotletkas {
  export class RandomNormalEmitter extends Emitter {
    onAnyParticleEmit(particleToEmit: Kotletkas.Particle) {
      let emitterGeometry: THREE.Geometry;

      if (this.geometry instanceof THREE.BufferGeometry) {
        emitterGeometry = new THREE.Geometry().fromBufferGeometry(this.geometry);
      } else {
        emitterGeometry = this.geometry;
      }

      // @todo refactoring
      let numberOfFaces =
        (Math.random() * (emitterGeometry.faces.length - 1)) << 0;
      let face = emitterGeometry.faces[numberOfFaces];
      let xx = [], yy = [], zz = [];
      let points = [face.a, face.b, face.c];

      for (let i in points) {
        xx.push(emitterGeometry.vertices[points[i]].x);
        yy.push(emitterGeometry.vertices[points[i]].y);
        zz.push(emitterGeometry.vertices[points[i]].z);
      }

      xx = [Math.max.apply(null, xx), Math.min.apply(null, xx)];
      yy = [Math.max.apply(null, yy), Math.min.apply(null, yy)];
      zz = [Math.max.apply(null, zz), Math.min.apply(null, zz)];

      particleToEmit.position.set(
        Math.random() * (xx[0] - xx[1]) + (xx[1]),
        Math.random() * (yy[0] - yy[1]) + (yy[1]),
        Math.random() * (zz[0] - zz[1]) + (zz[1])
      );
    }
  }
}