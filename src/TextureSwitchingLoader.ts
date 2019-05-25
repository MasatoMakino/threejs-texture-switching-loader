import {
  TextureLoader,
  ImageBitmapLoader,
  Texture,
  CanvasTexture,
  LoadingManager
} from "three";
import { TextureSwitchingLoaderOption } from "./TextureSwitchingLoaderOption";
import { CanvasTextureOption } from "./CanvasTextureOption";

/**
 * Texture image loader, Switching TextureLoader and ImageBitmapLoader.
 */
export class TextureSwitchingLoader {
  public textureLoader: TextureLoader;
  public imageBitmapLoader: ImageBitmapLoader;
  private static isSupportImageBitmap: boolean;

  constructor(manager?: LoadingManager) {
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
  public load(url: string, option?: TextureSwitchingLoaderOption) {
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

  private loadImageBitmap(url: string, option: TextureSwitchingLoaderOption) {
    return new Promise((resolve, reject) => {
      if (option.imageBitmapOption) {
        this.imageBitmapLoader.setOptions(option.imageBitmapOption);
      }

      this.imageBitmapLoader.load(
        url,
        imageBitmap => {
          const texture = new CanvasTexture(imageBitmap as any); //FIXME : any type.
          TextureSwitchingLoader.setTextureOptions(
            texture,
            option.canvasTextureOption
          );
          resolve(texture);
        },
        undefined,
        err => {
          console.log("TextureSwitchingLoader : ");
          reject(err);
        }
      );
    });
  }

  private loadTexture(url: string, option: TextureSwitchingLoaderOption) {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        texture => {
          TextureSwitchingLoader.setImageBitmapOptions(
            texture,
            option.imageBitmapOption
          );
          TextureSwitchingLoader.setTextureOptions(
            texture,
            option.canvasTextureOption
          );
          resolve(texture);
        },
        undefined,
        err => {
          console.log("TextureSwitchingLoader : ");
          reject(err);
        }
      );
    });
  }

  private static setTextureOptions(
    texture: Texture,
    option: CanvasTextureOption
  ) {
    if (option == null) return;
    if (option.mapping != null) texture.mapping = option.mapping;
    if (option.wrapS != null) texture.wrapS = option.wrapS;
    if (option.wrapT != null) texture.wrapT = option.wrapT;
    if (option.magFilter != null) texture.magFilter = option.magFilter;
    if (option.minFilter != null) texture.minFilter = option.minFilter;
    if (option.format != null) texture.format = option.format;
    if (option.type != null) texture.type = option.type;
    if (option.anisotropy != null) texture.anisotropy = option.anisotropy;
  }

  private static setImageBitmapOptions(
    texture: Texture,
    imageBitmapOption?: ImageBitmapOptions
  ) {
    if (imageBitmapOption == null) return;

    const orientation = imageBitmapOption.imageOrientation;
    if (orientation != null && orientation !== "flipY") texture.flipY = false;

    if (imageBitmapOption.premultiplyAlpha != null)
      texture.premultiplyAlpha =
        imageBitmapOption.premultiplyAlpha === "premultiply";
  }
}
