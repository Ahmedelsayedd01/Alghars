import axios /* { AxiosResponse } */ from "axios";
import { useState } from "react";
import { useAuth } from "../Context/Auth"; // Make sure to import useAuth if required
import { PostOptions } from "../types";

export const usePost = ({ url, login = false, type = false }: PostOptions) => {
  const auth = useAuth();
  // const [loadingPost, setLoadingPost] = useState(false);
  // const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
  //   null
  // );

  // const postData = async (data: { [key: string]: string }, name?: string) => {
  //   setLoadingPost(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const postData = async (
    data: { [key: string]: string } | FormData,
    name: string
  ) => {
    setLoadingPost(true);
    try {
      const token = auth?.userState?.token || "";
      const contentType = type ? "application/json" : "multipart/form-data";
      const config =
        !login && token
          ? {
              headers: {
                "Content-Type": contentType,
                Authorization: `Bearer ${token || ""}`,
              },
            }
          : {
              headers: { "Content-Type": contentType },
            };

      const response = await axios.post(url, data, config);

      if (response) {
        setResponse(response);
        {
          name ? auth.toastSuccess(name) : "";
        }
        // auth.toastSuccess(name)
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([_, messages]) => {
          // Show a toast for each error message
          (messages as string[]).forEach((message: string) => {
            auth.toastError(`${message}`);
          });
        });
      } else if (axios.isAxiosError(error) && error.response?.data?.message) {
        auth.toastError(error.response.data.message);
      } else {
        auth.toastError((error as Error).message);
      }

      console.error("Error posting JSON:", error);
    } finally {
      setLoadingPost(false);
    }
  };

  return { postData, loadingPost, response };
};
