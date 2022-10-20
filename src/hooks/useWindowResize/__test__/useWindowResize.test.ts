import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useWindowResize } from "../"

describe(`useWindowResize`, () => {
  it(`windowサイズが変更された時、useWindowResizeがwindowのwidth,heightの値を正しく取得する`, () => {
    resizeWindow(500, 500)
    const { result } = renderHook(() => useWindowResize())
    expect(result.current).toEqual({ width: 500, height: 500 })
    act(() => resizeWindow(600, 700))
    expect(result.current).toEqual({ width: 600, height: 700 })
  })
})

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};