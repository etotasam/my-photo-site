import { useDeviceCheck } from "../useDeviceCheck";
import { act, renderHook } from "@testing-library/react-hooks"
import { useWindowResize } from "@/hooks";

jest.mock("@/hooks")


describe("windowサイズでdeviceをチェック", () => {
  it("breakpointWidth値より大きいときは`PC`を返す", () => {
    const useWindowResizeMock = useWindowResize as jest.Mock
    useWindowResizeMock.mockReturnValue({ width: 1000 })
    const { result } = renderHook(() => useDeviceCheck())
    expect(result.current.device).toEqual("PC")
  })
  it("breakpointWidth値より小さいときは`SP`を返す", () => {
    const useWindowResizeMock = useWindowResize as jest.Mock
    useWindowResizeMock.mockReturnValue({ width: 400 })
    const { result } = renderHook(() => useDeviceCheck())
    expect(result.current.device).toEqual("SP")
  })
})