import { TextureLoader, ImageBitmapLoader, CanvasTexture } from "three";
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
export class TextureSwitchingLoader {
    constructor(manager) {
        this.textureLoader = new TextureLoader(manager);
        this.imageBitmapLoader = new ImageBitmapLoader(manager);
        this.imageBitmapLoader.setOptions({ imageOrientation: "flipY" }); //To find the same result TextureLoader and ImageBitmapLoader.
    }
    /**
     * Load image as Texture or CanvasTexture.
     *
     * @param url
     * @param option
     * @return Promise<Texture> Texture or CanvasTexture
     */
    load(url, option) {
        if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {
            TextureSwitchingLoader.isSupportImageBitmap =
                typeof createImageBitmap !== "undefined";
        }
        if (option == null) {
            option = {};
        }
        if (TextureSwitchingLoader.isSupportImageBitmap) {
            return this.loadImageBitmap(url, option);
        }
        return this.loadTexture(url, option);
    }
    loadImageBitmap(url, option) {
        return new Promise((resolve, reject) => {
            if (option.imageBitmapOption) {
                this.imageBitmapLoader.setOptions(option.imageBitmapOption);
            }
            this.imageBitmapLoader.load(url, imageBitmap => {
                const texture = new CanvasTexture(imageBitmap);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            }, undefined, err => {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    }
    loadTexture(url, option) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(url, texture => {
                TextureSwitchingLoader.setImageBitmapOptions(texture, option.imageBitmapOption);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            }, undefined, err => {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    }
    static setTextureOptions(texture, option) {
        if (option == null)
            return;
        if (option.mapping != null)
            texture.mapping = option.mapping;
        if (option.wrapS != null)
            texture.wrapS = option.wrapS;
        if (option.wrapT != null)
            texture.wrapT = option.wrapT;
        if (option.magFilter != null)
            texture.magFilter = option.magFilter;
        if (option.minFilter != null)
            texture.minFilter = option.minFilter;
        if (option.format != null)
            texture.format = option.format;
        if (option.type != null)
            texture.type = option.type;
        if (option.anisotropy != null)
            texture.anisotropy = option.anisotropy;
    }
    static setImageBitmapOptions(texture, imageBitmapOption) {
        if (imageBitmapOption == null)
            return;
        const orientation = imageBitmapOption.imageOrientation;
        if (orientation != null && orientation !== "flipY")
            texture.flipY = false;
        if (imageBitmapOption.premultiplyAlpha != null)
            texture.premultiplyAlpha =
                imageBitmapOption.premultiplyAlpha === "premultiply";
    }
}
