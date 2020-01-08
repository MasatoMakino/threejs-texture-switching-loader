import { TextureLoader, ImageBitmapLoader, Texture, LoadingManager } from "three";
import { TextureSwitchingLoaderOption } from "./TextureSwitchingLoaderOption";
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
export declare class TextureSwitchingLoader {
    textureLoader: TextureLoader;
    imageBitmapLoader: ImageBitmapLoader;
    private static isSupportImageBitmap;
    private cacheMap;
    constructor(manager?: LoadingManager);
    /**
     * Load image as Texture or CanvasTexture.
     *
     * @param url
     * @param option
     * @return Promise<Texture> Texture or CanvasTexture
     */
    load(url: string, option?: TextureSwitchingLoaderOption): Promise<Texture>;
    private loadImageBitmap;
    private loadTexture;
    private static setTextureOptions;
    private static setImageBitmapOptions;
}
//# sourceMappingURL=TextureSwitchingLoader.d.ts.map