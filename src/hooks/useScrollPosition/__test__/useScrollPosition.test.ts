import React from "react";
import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { useScrollPosition } from ".."

describe(`useScrollPosition`, () => {
  it(`useScrollPositionが正常に動いているか`, () => {
    scrollY(5)
    const { result } = renderHook(() => useScrollPosition())
    expect(result.current).toEqual(5)
    act(() => scrollY(100))
    expect(result.current).toEqual(100)
  })
})

const scrollY = (y: number) => {
  window.scrollY = y
  window.dispatchEvent(new Event("scroll"));
};