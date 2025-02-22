import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth";
import { ChangeStateOptions } from "../types";

export const useChangeState = () => {
  const auth = useAuth();
  const [loadingChange, setLoadingChange] = useState(false);
  const [responseChange, setResponseChange] = useState<AxiosResponse<
    any,
    any
  > | null>(null);

  const changeState = async ({ url, name, data }: ChangeStateOptions) => {
    // Accepting a single "data" object
    setLoadingChange(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.userState?.token || ""}`,
        },
      };

      // Send the "data" object directly as the request body

      const response = await axios.put(url, data || {}, config);

      if (response.status === 200) {
        setResponseChange(response);
        auth.toastSuccess(name);
        return true; // Return true on success
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        auth.toastError(error.message);
      } else {
        // Handle the case where error is not an instance of Error
        auth.toastError("An unknown error occurred");
      }
    } finally {
      setLoadingChange(false);
    }
  };

  return { changeState, loadingChange, responseChange };
};
