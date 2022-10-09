import { useAutoPhotoSlider } from "./useAutoPhotoSlider";
import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
//! context provider
import { CurrentImageIndexProvider } from "@/context/currentImageIndexContext";

const topImages = [
  {
    documentId: "document_id",
    width: 1000,
    createAt: new Date(),
    height: 750,
    url: "url",
    filename: "filename",
    id: "egypt_1",
  },
  {
    documentId: "document_id",
    width: 1000,
    createAt: new Date(),
    height: 750,
    url: "url",
    filename: "filename",
    id: "france_1",
  },
  {
    documentId: "document_id",
    width: 1000,
    createAt: new Date(),
    height: 750,
    url: "url",
    filename: "filename",
    id: "truky_1",
  },
];

const isTopImagesLoaded = false;
const initialTapPosition = 200;
// const requiredMove = 100

const tapOn: any = {
  changedTouches: [{ pageX: initialTapPosition }],
};
const tapOff: any = (position: number) => {
  return { changedTouches: [{ pageX: initialTapPosition + position }] };
};

afterEach(() => cleanup());

describe("imageを左へスワイプした時", () => {
  it("スワイプでの移動値が定数未満の場合何もしない", () => {
    const wrapper = ({ children }) => <CurrentImageIndexProvider>{children}</CurrentImageIndexProvider>;
    const { result } = renderHook(() => useAutoPhotoSlider({ topImages, isTopImagesLoaded }), { wrapper });
    act(() => result.current.currentImageIndexDispathcer(1));
    act(() => result.current.tapOn(tapOn));
    act(() => result.current.tapOff(tapOff(-99)));
    expect(result.current.currentImageIndex).toEqual(1);
  });

  it("next image の index を取得", () => {
    const wrapper = ({ children }) => <CurrentImageIndexProvider>{children}</CurrentImageIndexProvider>;
    const { result } = renderHook(() => useAutoPhotoSlider({ topImages, isTopImagesLoaded }), { wrapper });
    act(() => result.current.currentImageIndexDispathcer(1));
    act(() => result.current.tapOn(tapOn));
    act(() => result.current.tapOff(tapOff(-100)));
    expect(result.current.currentImageIndex).toEqual(2);
  });
  it("next image がない場合は index 0 を取得", () => {
    const wrapper = ({ children }) => <CurrentImageIndexProvider>{children}</CurrentImageIndexProvider>;
    const { result } = renderHook(() => useAutoPhotoSlider({ topImages, isTopImagesLoaded }), { wrapper });
    act(() => result.current.currentImageIndexDispathcer(2));
    act(() => result.current.tapOn(tapOn));
    act(() => result.current.tapOff(tapOff(-100)));
    expect(result.current.currentImageIndex).toEqual(0);
  });
});

describe("imageを右へスワイプした時", () => {
  it("prev image の index を取得", () => {
    const wrapper = ({ children }) => <CurrentImageIndexProvider>{children}</CurrentImageIndexProvider>;
    const { result } = renderHook(() => useAutoPhotoSlider({ topImages, isTopImagesLoaded }), { wrapper });
    act(() => result.current.currentImageIndexDispathcer(1));
    act(() => result.current.tapOn(tapOn));
    act(() => result.current.tapOff(tapOff(100)));
    expect(result.current.currentImageIndex).toEqual(0);
  });
  it("prev image がない場合は last image index を取得", () => {
    const wrapper = ({ children }) => <CurrentImageIndexProvider>{children}</CurrentImageIndexProvider>;
    const { result } = renderHook(() => useAutoPhotoSlider({ topImages, isTopImagesLoaded }), { wrapper });
    act(() => result.current.currentImageIndexDispathcer(0));
    act(() => result.current.tapOn(tapOn));
    act(() => result.current.tapOff(tapOff(100)));
    expect(result.current.currentImageIndex).toEqual(2);
  });
});
