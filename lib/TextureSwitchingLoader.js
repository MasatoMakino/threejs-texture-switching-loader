"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var three_1 = require("three");
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
var TextureSwitchingLoader = /** @class */ (function () {
    function TextureSwitchingLoader(manager) {
        this.cacheMap = new Map();
        if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {
            TextureSwitchingLoader.isSupportImageBitmap =
                typeof createImageBitmap !== "undefined";
        }
        if (!TextureSwitchingLoader.isSupportImageBitmap) {
            this.textureLoader = new three_1.TextureLoader(manager);
        }
        else {
            this.imageBitmapLoader = new three_1.ImageBitmapLoader(manager);
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
    TextureSwitchingLoader.prototype.load = function (url, option) {
        if (option == null) {
            option = {};
        }
        if (TextureSwitchingLoader.isSupportImageBitmap) {
            return this.loadImageBitmap(url, option);
        }
        return this.loadTexture(url, option);
    };
    TextureSwitchingLoader.prototype.loadImageBitmap = function (url, option) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var onload = function (imageBitmap) {
                _this.cacheMap.set(url, imageBitmap);
                var texture = new three_1.CanvasTexture(imageBitmap); //FIXME : any type.
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            };
            var cached = _this.cacheMap.get(url);
            if (cached !== undefined) {
                onload(cached);
            }
            if (option.imageBitmapOption) {
                _this.imageBitmapLoader.setOptions(option.imageBitmapOption);
            }
            _this.imageBitmapLoader.load(url, onload, undefined, function (err) {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    };
    TextureSwitchingLoader.prototype.loadTexture = function (url, option) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.textureLoader.load(url, function (texture) {
                TextureSwitchingLoader.setImageBitmapOptions(texture, option.imageBitmapOption);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            }, undefined, function (err) {
                console.log("TextureSwitchingLoader : ");
                reject(err);
            });
        });
    };
    TextureSwitchingLoader.setTextureOptions = function (texture, option) {
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
    };
    TextureSwitchingLoader.setImageBitmapOptions = function (texture, imageBitmapOption) {
        if (imageBitmapOption == null)
            return;
        var orientation = imageBitmapOption.imageOrientation;
        if (orientation != null) {
            texture.flipY = orientation === "flipY";
        }
        if (imageBitmapOption.premultiplyAlpha != null)
            texture.premultiplyAlpha =
                imageBitmapOption.premultiplyAlpha === "premultiply";
    };
    return TextureSwitchingLoader;
}());
exports.TextureSwitchingLoader = TextureSwitchingLoader;
