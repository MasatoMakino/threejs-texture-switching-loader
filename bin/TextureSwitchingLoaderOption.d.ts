import { CanvasTextureOption } from "./CanvasTextureOption";
/**
 * Options for Three.ImageBitmapLoader.
 */
export interface TextureSwitchingLoaderOption {
    /**
     * Options for THREE.CanvasTexture Constructor.
     */
    canvasTextureOption?: CanvasTextureOption;
    /**
     * Options for THREE.ImageBitmapLoader.setOptions().
     * @see [Three.js Official Document]{@link https://threejs.org/docs/#api/en/loaders/ImageBitmapLoader.setOptions}
     * @see [createImageBitmap() parameters 'options'](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap#Parameters)
     */
    imageBitmapOption?: ImageBitmapOptions;
}
//# sourceMappingURL=TextureSwitchingLoaderOption.d.ts.map