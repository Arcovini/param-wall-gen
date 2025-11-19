declare module 'n8ao' {
  import { Scene, Camera } from 'three';
  import { Pass } from 'postprocessing';

  export interface N8AOConfiguration {
    aoRadius: number;
    aoSamples: number;
    denoiseSamples: number;
    denoiseRadius: number;
    intensity: number;
    aoDistance: number;
    distanceFalloff: number;
    maxDistance: number;
    renderMode: number;
    depthBufferType: number;
  }

  export class N8AOPostPass extends Pass {
    constructor(scene: Scene, camera: Camera, width: number, height: number);
    configuration: N8AOConfiguration;
    setSize(width: number, height: number): void;
    setQualityMode(mode: 'Performance' | 'Low' | 'Medium' | 'High' | 'Ultra'): void;
    setDisplayMode(mode: 'Combined' | 'AO' | 'No AO' | 'Split' | 'Split AO'): void;
    dispose(): void;
  }

  export class N8AOPass {
    constructor(scene: Scene, camera: Camera, width: number, height: number);
  }

  export enum DepthType {
    Default = 0,
    Reverse = 1
  }
}
