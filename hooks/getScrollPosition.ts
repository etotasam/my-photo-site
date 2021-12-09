import { useState, useEffect, DependencyList } from "react"

export const useScrollPosition = () => {
  const [position, setPosition] = useState<number>(void 0)

  useEffect(() => {
    const getPosition = () => {
      setPosition(window.scrollY)
    }
    getPosition()
    window.addEventListener(`scroll`, getPosition)
    return () => window.removeEventListener(`scroll`, getPosition)
  }, [])
  return position
}