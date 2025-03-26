import React, { useCallback, useLayoutEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEffectEvent = <T extends (...args: any[]) => any>(fn: T) => {
  const ref = React.useRef<T | null>(null)
  useLayoutEffect(() => {
    ref.current = fn
  }, [fn])
  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    const f = ref.current
    return f!(...args)
  }, [])
}
export default useEffectEvent
