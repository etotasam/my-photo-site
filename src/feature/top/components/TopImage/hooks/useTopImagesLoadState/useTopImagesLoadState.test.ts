import { useTopImagesLoadState } from "./useTopImagesLoadState"
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

const topImages = [{
  documentId: "document_id",
  width: 1000,
  createAt: new Date,
  height: 750,
  url: "url",
  filename: "filename",
  id: "egypt_1"
}, {
  documentId: "document_id",
  width: 1000,
  createAt: new Date,
  height: 750,
  url: "url",
  filename: "filename",
  id: "france_1"
}, {
  documentId: "document_id",
  width: 1000,
  createAt: new Date,
  height: 750,
  url: "url",
  filename: "filename",
  id: "truky_1"
}]


describe(`useTopImagesLoadStateのテスト`, () => {
  it(`image読み込みがすべて完了したら true を返す`, () => {
    const { result } = renderHook(() => useTopImagesLoadState({ topImages }));
    act(() => result.current.imageOnloaded("egypt_1"))
    expect(result.current.isTopImagesLoaded).toEqual(false);
    act(() => result.current.imageOnloaded("truky_1"))
    act(() => result.current.imageOnloaded("france_1"))
    expect(result.current.isTopImagesLoaded).toEqual(true);
  });
});