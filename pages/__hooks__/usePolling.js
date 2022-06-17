import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function usePolling(url) {
  const { data, error, isValidating } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
  };
}
