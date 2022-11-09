export function withCache<T extends (...params: Parameters<T>) => unknown>(
  fn: T
): (...params: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...params: Parameters<T>) => {
    const localStorageKeyName = `cache-route-${fn.name}=${JSON.stringify(
      params
    )}`
    const storageResultFunction =
      window.localStorage.getItem(localStorageKeyName)
    if (storageResultFunction) {
      const response = JSON.parse(storageResultFunction) as any
      return { ...response, isCached: true }
    } else {
      const response = (await fn.call(null, ...params)) as any
      window.localStorage.setItem(localStorageKeyName, JSON.stringify(response))
      return { ...response, isCached: false }
    }
  }
}
