import { useState, useCallback, useRef, useEffect } from "react";

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

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: BodyInit | null = null,
      headers: Headers = {}
    ): Promise<ResponseData> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

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
        setError(err.message || "An error occurred!");
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
