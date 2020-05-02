import { TextureLoader, ImageBitmapLoader, CanvasTexture } from "three";
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
export class TextureSwitchingLoader {
    constructor(manager) {
        this.cacheMap = new Map();
        if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {
            TextureSwitchingLoader.isSupportImageBitmap =
                typeof createImageBitmap !== "undefined";
        }
        if (!TextureSwitchingLoader.isSupportImageBitmap) {
            this.textureLoader = new TextureLoader(manager);
        }
        else {
            this.imageBitmapLoader = new ImageBitmapLoader(manager);
            this.imageBitmapLoader.setOptions({ imageOrientation: "flipY" }); //To find the same result TextureLoader and ImageBitmapLoader.
        }
    }
    /**
     * Load image as Texture or CanvasTexture.
     *
     * @param url
     * @param option
     * @return Promise<Texture> Texture or CanvasTexture
     */
    load(url, option) {
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
            const onload = imageBitmap => {
                this.cacheMap.set(url, imageBitmap);
                const texture = new CanvasTexture(imageBitmap); //FIXME : any type.
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            };
            const cached = this.cacheMap.get(url);
            if (cached !== undefined) {
                onload(cached);
            }
            if (option.imageBitmapOption) {
                this.imageBitmapLoader.setOptions(option.imageBitmapOption);
            }
            this.imageBitmapLoader.load(url, onload, undefined, err => {
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
        if (orientation != null) {
            texture.flipY = orientation === "flipY";
        }
        if (imageBitmapOption.premultiplyAlpha != null)
            texture.premultiplyAlpha =
                imageBitmapOption.premultiplyAlpha === "premultiply";
    }
}