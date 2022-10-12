import { useTopImagesLoadState } from "../useTopImagesLoadState";
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
//! context provider
import { TopImagesLoadStateProvider } from "@/context/topImagesLoadStateContext";

afterEach(() => cleanup());

const topImages: any = [{ id: "egypt_1" }, { id: "france_1" }, { id: "truky_1" }];

describe(`useTopImagesLoadStateのテスト`, () => {
  it(`image読み込みがすべて完了したら true を返す`, () => {
    const wrapper = ({ children }) => <TopImagesLoadStateProvider>{children}</TopImagesLoadStateProvider>;
    const { result } = renderHook(() => useTopImagesLoadState({ topImages }), { wrapper });
    act(() => result.current.imageOnloaded("egypt_1"));
    expect(result.current.isTopImagesLoaded).toEqual(false);
    act(() => result.current.imageOnloaded("truky_1"));
    act(() => result.current.imageOnloaded("france_1"));
    expect(result.current.isTopImagesLoaded).toEqual(true);
  });
});
