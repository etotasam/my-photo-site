import { useState, useEffect } from "react"

export const useScrollPosition = () => {
  const [position, setPosition] = useState<number>(0)

  const getPosition = () => {
    setPosition(window.scrollY)
  }
  useEffect(() => {
    getPosition()
    window.addEventListener(`scroll`, getPosition)
    return () => window.removeEventListener(`scroll`, getPosition)
  }, [])
  return position
}