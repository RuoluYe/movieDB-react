import { useState, useCallback } from "react";

const useLoading = (initialLoading = true) => {
  const [loading, setLoading] = useState(initialLoading);
  const fetchData = useCallback((fetchPromise) => {
    setLoading(true);
    return fetchPromise.finally(() => {
      setLoading(false);
    });
  }, [setLoading])

  return {
    loading,
    fetchData,
    setLoading
  }
};
export default useLoading;