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

  const postData = async (data: { [key: string]: string } | FormData, name: string) => {
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

      if (response.status === 200 || response.status === 201) {
        setResponse(response);
        {
          name ? auth.toastSuccess(name) : "";
        }
        // auth.toastSuccess(name)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        auth.toastError(error.message);
      } else {
        // Handle the case where error is not an instance of Error
        auth.toastError("An unknown error occurred");
      }
    } finally {
      setLoadingPost(false);
    }
  };

  return { postData, loadingPost, response };
};
