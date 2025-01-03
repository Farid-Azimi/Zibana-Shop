import { useState, useCallback, useRef, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Headers = { [key: string]: string };
type ErrorType = string | null;

interface ResponseData {
  message?: string;
  [key: string]: any;
}

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);
  
  const { token } = useUserStore();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: BodyInit | null = null,
      headers: Headers = {},
      requiresAuth: boolean = false
    ): Promise<ResponseData> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      if (requiresAuth && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData: ResponseData = await response.json();
        
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message || "An error occurred!");
        }

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        setError(err.message || "An error occurred!");
        setIsLoading(false);
        throw err;
      }
    },
    [token]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => {
        try {
          if (!abortCtrl.signal.aborted) {
            abortCtrl.abort();
          }
        } catch (error) {
          console.error("Error aborting request:", error);
        }
      });
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};