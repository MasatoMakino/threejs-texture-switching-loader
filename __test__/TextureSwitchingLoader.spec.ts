import { describe, expect, it } from "vitest";
import { TextureSwitchingLoader } from "../src/index.js";
import { TestImage } from "./TestImage.js";

describe("TextureSwitchingLoader", () => {
  it("should be constructable", () => {
    const loader = new TextureSwitchingLoader();
    expect(loader).toBeTruthy();
  });

  it("should be load image", async () => {
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load(TestImage);
    expect(texture).toBeTruthy();
  });

  it.fails("should be load image with wrong url", async () => {
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load("not exist url");
  });

  it("should be load image with option", async () => {
    const loader = new TextureSwitchingLoader();
    const texture = await loader.load(TestImage, {
      canvasTextureOption: {},
      imageBitmapOption: {},
    });
  });
});
