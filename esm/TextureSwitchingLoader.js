import { TextureLoader, ImageBitmapLoader, CanvasTexture, } from "three";
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
export class TextureSwitchingLoader {
    constructor(manager) {
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
            const onload = (imageBitmap) => {
                const texture = new CanvasTexture(imageBitmap);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            };
            if (option.imageBitmapOption) {
                this.imageBitmapLoader.setOptions(option.imageBitmapOption);
            }
            this.imageBitmapLoader.load(url, onload, undefined, (err) => {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    }
    loadTexture(url, option) {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(url, (texture) => {
                TextureSwitchingLoader.setImageBitmapOptions(texture, option.imageBitmapOption);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            }, undefined, (err) => {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    }
    static setTextureOptions(texture, option) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (option == null)
            return;
        (_a = texture.mapping) !== null && _a !== void 0 ? _a : (texture.mapping = option.mapping);
        (_b = texture.wrapS) !== null && _b !== void 0 ? _b : (texture.wrapS = option.wrapS);
        (_c = texture.wrapT) !== null && _c !== void 0 ? _c : (texture.wrapT = option.wrapT);
        (_d = texture.magFilter) !== null && _d !== void 0 ? _d : (texture.magFilter = option.magFilter);
        (_e = texture.minFilter) !== null && _e !== void 0 ? _e : (texture.minFilter = option.minFilter);
        (_f = texture.format) !== null && _f !== void 0 ? _f : (texture.format = option.format);
        (_g = texture.type) !== null && _g !== void 0 ? _g : (texture.type = option.type);
        (_h = texture.anisotropy) !== null && _h !== void 0 ? _h : (texture.anisotropy = option.anisotropy);
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
