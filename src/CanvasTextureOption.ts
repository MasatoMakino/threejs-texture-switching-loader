import {
  Mapping,
  Wrapping,
  TextureFilter,
  PixelFormat,
  TextureDataType
} from "three";

/**
 * Options for THREE.CanvasTexture Constructor.
 * @see [Three.js Official Document]{@link https://threejs.org/docs/#api/en/textures/CanvasTexture}
 */
export interface CanvasTextureOption {
  mapping?: Mapping;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  magFilter?: TextureFilter;
  minFilter?: TextureFilter;
  format?: PixelFormat;
  type?: TextureDataType;
  anisotropy?: number;
}
