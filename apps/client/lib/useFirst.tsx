import { EffectCallback, useEffect, useRef } from "react"

export function useFirst(fn: EffectCallback) {
  const called = useRef(false)

  useEffect(() => {
    if (called.current) return
    called.current = true

    return fn()
  }, [])
}

// render Component
// d = exec effect
// render Component
// d()
// d = exec effect
// render Component
// d()
// d = effect
