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
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([_, messages]) => {
          // Show a toast for each error message
          (messages as string[]).forEach((message: string) => {
            auth.toastError(`${message}`);
          });
        });
      } else if (axios.isAxiosError(error) && error.response?.data?.error) {
        auth.toastError(error.response.data.error);
      } else {
        auth.toastError((error as Error).message);
      }

      console.error("Error posting JSON:", error);
    } finally {
      setLoadingChange(false);
    }
  };

  return { changeState, loadingChange, responseChange };
};
