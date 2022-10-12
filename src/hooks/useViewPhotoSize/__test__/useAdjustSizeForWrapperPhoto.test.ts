import { act, cleanup, renderHook } from "@testing-library/react-hooks"

import { useAdjustSizeForWrapperPhoto } from ".."


const wideImage: any = {
  width: 1000,
  height: 750
}
const tallImage: any = {
  width: 750,
  height: 1000
}
const headerHeight = 45
const footerHeight = 45

//? windowサイズの変更
const setWindowSize = ({ width, height }: { width: number, height: number }) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

afterEach(() => cleanup())

describe("windowサイズの変更でimageサイズも変更され、比率は保たれる", () => {
  it("windowがwideの時、image(wide)の比率が保たれる", () => {
    const sourceImageRatio = wideImage.height / wideImage.width
    const windowSize = { width: 800, height: 700 }
    const { result } = renderHook(() => useAdjustSizeForWrapperPhoto({ imageData: wideImage, headerHeight, footerHeight }))
    act(() => setWindowSize(windowSize))
    const photoSize = result.current.photoSize
    const ratio = Math.ceil((photoSize.height / photoSize.width) * 100) / 100
    expect(ratio).toEqual(sourceImageRatio)
    expect(photoSize.width).toEqual(windowSize.height - (headerHeight + footerHeight))
  })
  it("windowがtallの時、image(wide)の比率が保たれる", () => {
    const sourceImageRatio = wideImage.height / wideImage.width
    const windowSize = { width: 800, height: 1000 }
    const { result } = renderHook(() => useAdjustSizeForWrapperPhoto({ imageData: wideImage, headerHeight, footerHeight }))
    act(() => setWindowSize(windowSize))
    const photoSize = result.current.photoSize
    const ratio = Math.ceil((photoSize.height / photoSize.width) * 100) / 100
    expect(ratio).toEqual(sourceImageRatio)
    expect(photoSize.width).toEqual(windowSize.width * 0.9)
  })
  it("windowがwideの時、image(tall)の比率が保たれる", () => {
    const sourceImageRatio = tallImage.width / tallImage.height
    const windowSize = { width: 1200, height: 1000 }
    const { result } = renderHook(() => useAdjustSizeForWrapperPhoto({ imageData: tallImage, headerHeight, footerHeight }))
    act(() => setWindowSize(windowSize))
    const photoSize = result.current.photoSize
    const ratio = Math.ceil((photoSize.width / photoSize.height) * 100) / 100
    expect(ratio).toEqual(sourceImageRatio)
    expect(photoSize.width).toEqual(Math.floor((windowSize.height - (headerHeight + footerHeight)) * ratio))
  })
  it("windowがtallの時、image(tall)の比率が保たれる", () => {
    const sourceImageRatio = tallImage.width / tallImage.height
    const windowSize = { width: 659, height: 1000 }
    const { result } = renderHook(() => useAdjustSizeForWrapperPhoto({ imageData: tallImage, headerHeight, footerHeight }))
    act(() => setWindowSize(windowSize))
    const photoSize = result.current.photoSize
    const ratio = Math.ceil((photoSize.width / photoSize.height) * 100) / 100
    expect(ratio).toEqual(sourceImageRatio)
    expect(photoSize.width).toEqual(Math.floor((windowSize.width * 0.9) * ratio))
  })
})
