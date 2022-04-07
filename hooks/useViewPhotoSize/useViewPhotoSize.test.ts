import { act, cleanup, renderHook } from "@testing-library/react-hooks"

import { useViewPhotoSize } from "."

afterEach(() => cleanup())

describe(`useViewPhotoSize 比率の検証`, () => {
  const headerHeight = 50
  const footerHeight = 50
  const minLongSide = 350
  const maxLong = 1000
  let maxLongSide = 0
  let ratio: number
  const getMaxLongSide = (maxLong: number, imgHeight: number, imgWidth: number) => {
    return Math.min(maxLong, Math.max(imgHeight, imgWidth))
  }
  const image = {
    documentId: "",
    width: 0,
    height: 0,
    createAt: new Date(),
    url: "",
    filename: "",
    id: "",
  }
  const windowSize = {
    width: 0,
    height: 0
  }

  const sizeRatio = (width: number, height: number) => {
    if (width === height) return `square`
    return width > height ? `horizon` : `vartical`
    // if (width > height) return `horizon`
    // if (height > width) return `vartical`
    // return `square`
  }
  it(`window: 横長, image: 横長`, () => {
    windowSize.width = 1500
    windowSize.height = 1000
    expect(sizeRatio(windowSize.width, windowSize.height)).toBe(`horizon`)
    image.width = 1000
    image.height = 700
    expect(sizeRatio(image.width, image.height)).toBe(`horizon`)
    // const maxLongSide = Math.min(1000, Math.max(image.height, image.width))
    maxLongSide = getMaxLongSide(maxLong, image.height, image.width)
    const elementHeight = windowSize.height - (headerHeight + footerHeight)
    const ratio = image.height / image.width;
    const width = elementHeight;
    const height = elementHeight * ratio;
    const minWidth = minLongSide;
    const minHeight = minLongSide * ratio;
    const maxWidth = maxLongSide;
    const maxHeight = maxLongSide * ratio;
    setWindowSize(windowSize.width, windowSize.height)
    const { result } = renderHook(() => useViewPhotoSize(image, headerHeight, footerHeight))
    expect(result.current).toEqual({
      width: Math.floor(width),
      height: Math.floor(height),
      minWidth: Math.floor(minWidth),
      minHeight: Math.floor(minHeight),
      maxWidth: Math.floor(maxWidth),
      maxHeight: Math.floor(maxHeight)
    })
  })
  it(`window: 横長, image: 縦長`, () => {
    windowSize.width = 1500
    windowSize.height = 1000
    expect(sizeRatio(windowSize.width, windowSize.height)).toBe(`horizon`)
    image.width = 700
    image.height = 1000
    expect(sizeRatio(image.width, image.height)).toBe(`vartical`)
    maxLongSide = getMaxLongSide(maxLong, image.height, image.width)
    const elementHeight = windowSize.height - (headerHeight + footerHeight)
    const ratio = image.width / image.height;
    const width = elementHeight * ratio;
    const height = elementHeight;
    const minWidth = minLongSide * ratio;
    const minHeight = minLongSide;
    const maxWidth = maxLongSide * ratio;
    const maxHeight = maxLongSide;
    const { result } = renderHook(() => useViewPhotoSize(image, headerHeight, footerHeight))
    expect(result.current).toEqual({
      width: Math.floor(width),
      height: Math.floor(height),
      minWidth: Math.floor(minWidth),
      minHeight: Math.floor(minHeight),
      maxWidth: Math.floor(maxWidth),
      maxHeight: Math.floor(maxHeight)
    })
  })
  it(`window: 縦長, image: 横長`, () => {
    windowSize.width = 1000
    windowSize.height = 1500
    expect(sizeRatio(windowSize.width, windowSize.height)).toBe(`vartical`)
    image.width = 1000
    image.height = 700
    expect(sizeRatio(image.width, image.height)).toBe(`horizon`)
    maxLongSide = getMaxLongSide(maxLong, image.height, image.width)
    const elementWidth = windowSize.width * 0.9
    const ratio = image.height / image.width;
    const width = elementWidth;
    const height = elementWidth * ratio;
    const minWidth = minLongSide;
    const minHeight = minLongSide * ratio;
    const maxWidth = maxLongSide;
    const maxHeight = maxLongSide * ratio;
    const { result } = renderHook(() => useViewPhotoSize(image, headerHeight, footerHeight))
    expect(result.current).toEqual({
      width: Math.floor(width),
      height: Math.floor(height),
      minWidth: Math.floor(minWidth),
      minHeight: Math.floor(minHeight),
      maxWidth: Math.floor(maxWidth),
      maxHeight: Math.floor(maxHeight)
    })
  })
  it(`window: 縦長, image: 縦長`, () => {
    windowSize.width = 1000
    windowSize.height = 1500
    expect(sizeRatio(windowSize.width, windowSize.height)).toBe(`vartical`)
    image.width = 700
    image.height = 1000
    expect(sizeRatio(image.width, image.height)).toBe(`vartical`)
    maxLongSide = getMaxLongSide(maxLong, image.height, image.width)
    const elementWidth = windowSize.width * 0.9
    const ratio = image.width / image.height;
    const width = elementWidth * ratio;
    const height = elementWidth;
    const minWidth = minLongSide * ratio;
    const minHeight = minLongSide;
    const maxWidth = maxLongSide * ratio;
    const maxHeight = maxLongSide;
    const { result } = renderHook(() => useViewPhotoSize(image, headerHeight, footerHeight))
    expect(result.current).toEqual({
      width: Math.floor(width),
      height: Math.floor(height),
      minWidth: Math.floor(minWidth),
      minHeight: Math.floor(minHeight),
      maxWidth: Math.floor(maxWidth),
      maxHeight: Math.floor(maxHeight)
    })
  })

})

const setWindowSize = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};