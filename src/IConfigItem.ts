namespace Kotletkas {
  export interface IConfigItem {
    role: string;
    geometry: THREE.Geometry|THREE.BufferGeometry;
    material: THREE.Material;
    name?: string;
    position?: {x: number, y: number, z: number}
  }
}
