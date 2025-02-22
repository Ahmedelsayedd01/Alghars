import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth"; // Make sure to import useAuth if required

export const useDelete = () => {
  const auth = useAuth();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [responseDelete, setResponseDelete] = useState<AxiosResponse<
    any,
    any
  > | null>(null);

  const deleteData = async (url: string, name: string) => {
    setLoadingDelete(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.userState?.token || ""}`,
        },
      };

      const response = await axios.delete(url, config);

      if (response.status === 200) {
        setResponseDelete(response);
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
      setLoadingDelete(false);
    }
  };

  return { deleteData, loadingDelete, responseDelete };
};
