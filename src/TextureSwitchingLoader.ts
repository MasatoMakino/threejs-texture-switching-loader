import {
  TextureLoader,
  ImageBitmapLoader,
  Texture,
  CanvasTexture,
  LoadingManager,
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
    if (TextureSwitchingLoader.isSupportImageBitmap === undefined) {
      TextureSwitchingLoader.isSupportImageBitmap =
        typeof createImageBitmap !== "undefined";
    }

    if (!TextureSwitchingLoader.isSupportImageBitmap) {
      this.textureLoader = new TextureLoader(manager);
    } else {
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
  public load(
    url: string,
    option?: TextureSwitchingLoaderOption
  ): Promise<Texture> {
    if (option == null) {
      option = {};
    }

    if (TextureSwitchingLoader.isSupportImageBitmap) {
      return this.loadImageBitmap(url, option);
    }
    return this.loadTexture(url, option);
  }

  private loadImageBitmap(
    url: string,
    option: TextureSwitchingLoaderOption
  ): Promise<Texture> {
    return new Promise((resolve, reject) => {
      const onload = (imageBitmap) => {
        const texture = new CanvasTexture(imageBitmap);
        TextureSwitchingLoader.setTextureOptions(
          texture,
          option.canvasTextureOption
        );
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

  private loadTexture(
    url: string,
    option: TextureSwitchingLoaderOption
  ): Promise<Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => {
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
        (err) => {
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

    texture.mapping ??= option.mapping;
    texture.wrapS ??= option.wrapS;
    texture.wrapT ??= option.wrapT;
    texture.magFilter ??= option.magFilter;
    texture.minFilter ??= option.minFilter;
    texture.format ??= option.format;
    texture.type ??= option.type;
    texture.anisotropy ??= option.anisotropy;
  }

  private static setImageBitmapOptions(
    texture: Texture,
    imageBitmapOption?: ImageBitmapOptions
  ) {
    if (imageBitmapOption == null) return;

    const orientation = imageBitmapOption.imageOrientation;
    if (orientation != null) {
      texture.flipY = orientation === "flipY";
    }
    if (imageBitmapOption.premultiplyAlpha != null)
      texture.premultiplyAlpha =
        imageBitmapOption.premultiplyAlpha === "premultiply";
  }
}
