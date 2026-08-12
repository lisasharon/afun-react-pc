const RECENT_MAX = 10

export function loadRecentSearches(key: string, fallback: string[] = []): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return fallback
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return fallback
  }
}

export function saveRecentSearches(key: string, items: string[]) {
  localStorage.setItem(key, JSON.stringify(items.slice(0, RECENT_MAX)))
}

export function pushRecentSearch(
  key: string,
  current: string[],
  value: string,
): string[] {
  const next = value.trim()
  if (!next) return current
  const items = [next, ...current.filter((item) => item !== next)].slice(
    0,
    RECENT_MAX,
  )
  saveRecentSearches(key, items)
  return items
}
