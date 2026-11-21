import { useEffect, useState } from 'react'

export type DesignVariant = '1' | '2'

const storageKey = 'chelust-design-variant'

function parseVariant(value: string | null): DesignVariant | undefined {
  return value === '1' || value === '2' ? value : undefined
}

function getVariant(): DesignVariant {
  const explicit = parseVariant(new URLSearchParams(window.location.search).get('variant'))
  if (explicit) return explicit

  try {
    return parseVariant(window.localStorage.getItem(storageKey)) ?? '1'
  } catch {
    return '1'
  }
}

export function useDesignVariant() {
  const [variant, setVariant] = useState(getVariant)

  useEffect(() => {
    function syncVariant() {
      setVariant(getVariant())
    }

    window.addEventListener('popstate', syncVariant)
    return () => window.removeEventListener('popstate', syncVariant)
  }, [])

  function selectVariant(next: DesignVariant) {
    const url = new URL(window.location.href)
    url.searchParams.set('variant', next)
    window.history.replaceState(window.history.state, '', url)

    try {
      window.localStorage.setItem(storageKey, next)
    } catch {
      // The URL retains the selection when storage is unavailable.
    }

    setVariant(next)
  }

  return { variant, selectVariant }
}
