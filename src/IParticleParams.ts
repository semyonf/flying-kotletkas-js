import * as THREE from 'three';

export interface IParticleParams {
  count: number;
  lifespan: number;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}