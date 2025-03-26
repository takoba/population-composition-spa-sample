import { useRef, useEffect } from 'react'

const usePrevious = <T>(value: T, initialValue?: T): T | undefined => {
  const ref = useRef(initialValue)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
export default usePrevious
