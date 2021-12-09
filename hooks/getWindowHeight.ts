import { useState, useEffect, DependencyList } from "react"

export const useWindowResize = () => {
  const [size, setSize] = useState<{ width: number, height: number }>({
    width: void 0,
    height: void 0
  })

  useEffect(() => {
    const getSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    getSize()
    window.addEventListener(`resize`, getSize)
    return () => window.removeEventListener(`resize`, getSize)
  }, [])
  return size
}