import { describe, expect, it, vi } from "vitest";
import { TextureSwitchingLoader } from "../src/index.js";
import { TestImage } from "./TestImage.js";

describe("TextureSwitchingLoader", () => {
  const clearSupportImageBitmapFlag = () => {
    // @ts-ignore
    window.createImageBitmap = undefined;
    // @ts-ignore
    TextureSwitchingLoader.isSupportImageBitmap = undefined;
  };

  const mockImageBitmap = () => {
    clearSupportImageBitmapFlag();
    const mockCreateImageBitmap = vi.fn(async () => {
      return { width: 17, height: 18, close: vi.fn() };
    });

    window.createImageBitmap = mockCreateImageBitmap;
  };

  const resetMock = () => {
    vi.restoreAllMocks();
    clearSupportImageBitmapFlag();
  };

  it("should be constructable", () => {
    const loader = new TextureSwitchingLoader();
    expect(loader).toBeTruthy();
  });

  it("should be load image", async () => {
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load(TestImage);
    expect(texture).toBeTruthy();
  });

  it("should be load image with wrong url", async () => {
    const loader = new TextureSwitchingLoader();
    expect(loader.load("not exist url")).rejects.toThrow();
  });

  it("should be load image with option", async () => {
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load(TestImage, {
      canvasTextureOption: {},
      imageBitmapOption: {},
    });
  });

  it("should be load image with ImageBitmap", async () => {
    mockImageBitmap();
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load(TestImage);
    expect(texture).toBeTruthy();
    expect(texture.image.width).toBe(17);
    expect(texture.image.height).toBe(18);
    resetMock();
  });
});
