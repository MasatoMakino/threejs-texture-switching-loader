import {
  ColorSpace,
  Mapping,
  PixelFormat,
  TextureDataType,
  TextureFilter,
  Wrapping,
} from "three";

/**
 * Options for THREE.CanvasTexture Constructor.
 * @see [Three.js Official Document]{@link https://threejs.org/docs/#api/en/textures/CanvasTexture}
 */
export interface CanvasTextureOption {
  mapping?: Mapping;
  wrapS?: Wrapping;
  wrapT?: Wrapping;
  minFilter?: TextureFilter;
  format?: PixelFormat;
  type?: TextureDataType;
  anisotropy?: number;
  colorSpace?: ColorSpace;
}
