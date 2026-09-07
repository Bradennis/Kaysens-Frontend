import { useEffect, useState, useCallback } from "react";

// Small helper for "fetch on mount" data loading with loading/error state.
// fetcher must be a stable function (e.g. wrapped in useCallback by the caller,
// or defined outside the component) to avoid refetch loops.
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((res) => {
        if (!cancelled) setData(res?.data ?? res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => reload(), [reload]);

  return { data, loading, error, reload };
}
