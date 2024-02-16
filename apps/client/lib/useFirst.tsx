import { EffectCallback, useEffect, useRef } from "react"

export function useFirst(fn: EffectCallback) {
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    return fn()
  }, [])
}

