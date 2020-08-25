"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureSwitchingLoader = void 0;
var three_1 = require("three");
/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
var TextureSwitchingLoader = /** @class */ (function () {
    function TextureSwitchingLoader(manager) {
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
                var texture = new three_1.CanvasTexture(imageBitmap);
                TextureSwitchingLoader.setTextureOptions(texture, option.canvasTextureOption);
                resolve(texture);
            };
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
