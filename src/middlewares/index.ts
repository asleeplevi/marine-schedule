type StorageProps = {
  expires: number
  data: any
}

export function withCache<T extends (...params: Parameters<T>) => unknown>(
  fn: T,
  cacheTimeInSeconds: number
): (...params: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...params: Parameters<T>) => {
    const localStorageKeyName = `cache-route-${fn.name}=${JSON.stringify(
      params
    )}`
    const storageResultFunction =
      window.localStorage.getItem(localStorageKeyName)

    if (storageResultFunction) {
      const response = JSON.parse(storageResultFunction) as StorageProps
      const isCacheExpired = new Date().getTime() > response.expires
      if (isCacheExpired) {
        const response = (await fn.call(null, ...params)) as any

        const responseToStorage = {
          data: response,
          expires: new Date().getTime() + cacheTimeInSeconds * 1000,
        }

        window.localStorage.setItem(
          localStorageKeyName,
          JSON.stringify(responseToStorage)
        )
        return { ...response, isCached: false }
      } else return { ...response.data, isCached: true }
    } else {
      const response = (await fn.call(null, ...params)) as any

      const responseToStorage = {
        data: response,
        expires: new Date().getTime() + cacheTimeInSeconds * 1000,
      }

      window.localStorage.setItem(
        localStorageKeyName,
        JSON.stringify(responseToStorage)
      )
      return { ...response, isCached: false }
    }
  }
}
