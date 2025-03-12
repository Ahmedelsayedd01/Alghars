import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../Context/Auth";

export const useGet = <T,>(url: string) => {
  const auth = useAuth();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth?.userState?.token || ""}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        setData(response.data.data || response.data.packages);
        console.log("responseDataHook", response.data.data);
        console.log("responseDataHook2", response.data.packages);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        auth.toastError(error.message);
        console.log("error", error);
      } else {
        // Handle the case where error is not an instance of Error
        auth.toastError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [url, auth?.userState?.token]);

  useEffect(() => {
    fetchData();
    console.log("token", auth?.userState?.token);
  }, [fetchData, auth?.userState?.token]);

  return { refetch: fetchData, loading, data };
};
