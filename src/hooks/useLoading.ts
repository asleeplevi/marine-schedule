import { useState } from 'react'

export function useLoading<T = string>() {
  const [loadingStates, setLoadingStates] = useState<T[]>([])

  const isLoading = (loadingName: T) => loadingStates.includes(loadingName)

  const setLoading = (loadingName: T, remove?: boolean) => {
    if (remove)
      setLoadingStates(prevState =>
        prevState.filter(state => state !== loadingName)
      )
    else setLoadingStates(prevState => [...prevState, loadingName])
  }

  return { isLoading, setLoading }
}
