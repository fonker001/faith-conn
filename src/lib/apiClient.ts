"use client";

import api from "@/lib/axiosClient";
import { useAuthStore } from "@/store/authStore";
import { AxiosError, AxiosResponse } from "axios";

/* ========================================================================== */
/*  UNIFIED API FETCHER UTIL                                                 */
/* ========================================================================== */

interface ApiResponse<T = unknown> {
  ok: boolean;
  message: string;
  data?: T;
}

/** Generic authenticated fetcher with full method and body support */
export async function fetchWithAuth<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: unknown
): Promise<ApiResponse<T>> {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    console.warn("No access token found");
    return { ok: false, message: "User is not logged in" };
  }

  try {
    const response: AxiosResponse<T> = await api.request({
      url: endpoint.startsWith("/") ? endpoint : `/${endpoint}`,
      method,
      headers: { Authorization: `Bearer ${accessToken}` },
      ...(body ? { data: body } : {}),
    });

    return { ok: true, message: "Request successful", data: response.data };
  } catch (err) {
    const error = err as AxiosError<{ detail?: string; message?: string }>;
    console.error(`Error during ${method} ${endpoint}:`, error);

    return {
      ok: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Request failed",
    };
  }
}
