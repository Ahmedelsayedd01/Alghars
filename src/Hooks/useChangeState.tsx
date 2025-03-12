import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth";

export const useChangeState = () => {
  const auth = useAuth();
  const [loadingChange, setLoadingChange] = useState(false);
  const [responseChange, setResponseChange] = useState<AxiosResponse<
    any,
    any
  > | null>(null);

  interface ChangeStateOptions {
    url: string;
    message: string;
    data: { [key: string]: any };
  }

  const changeState = async ({ url, message, data }: ChangeStateOptions) => {
    // Accepting a single "data" object
    setLoadingChange(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.userState?.token || ""}`,
        },
      };

      // Send the "data" object directly as the request body

      const response = await axios.post(url, data || {}, config);

      if (response.status === 200) {
        setResponseChange(response);
        auth.toastSuccess(message);
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
