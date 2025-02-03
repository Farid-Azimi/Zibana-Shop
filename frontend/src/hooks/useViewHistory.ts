import { useCallback, useRef } from "react";
import { useHttpClient } from "./http-hook";

export const useViewHistory = () => {
  const { sendRequest } = useHttpClient();
  const requestSent = useRef(false);

  const addToViewHistory = useCallback(
    async (userId: string, productId: string) => {
      if (requestSent.current) return;

      requestSent.current = true;

      const controller = new AbortController();
      const { signal } = controller;

      try {
        const response = await sendRequest(
          "http://localhost:5000/api/users/add-view-history",
          "POST",
          JSON.stringify({ userId, productId }),
          { "Content-Type": "application/json" },
          true,
          signal
        );
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error adding to view history:", error);
        }
      }

      return () => {
        controller.abort();
      };
    },
    [sendRequest]
  );

  return { addToViewHistory };
};
