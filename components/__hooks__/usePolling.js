import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function usePolling(url, isSolved) {
  // If the chat has been closed, we don't need to poll for the data
  const pollingInterval = isSolved
    ? undefined
    : {
        refreshInterval: 1000,
      }

  const { data, error, isValidating } = useSWR(url, fetcher, pollingInterval)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  }
}
