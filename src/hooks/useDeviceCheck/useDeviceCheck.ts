import { useWindowResize } from "@/hooks";

const breakpointWidth = 768;
export const useDeviceCheck = () => {
  const { width } = useWindowResize()
  const device: "SP" | "PC" | undefined = width === 0 ? undefined : width < breakpointWidth ? "SP" : "PC";
  return { device }
}
