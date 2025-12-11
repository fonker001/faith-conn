"use server";

import { LoginValues } from "@/schema/schema";
import { fetcher } from "@/lib/fetcher";

interface LoginResponse {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
  status?: number;
}

export async function loginUser(formData: LoginValues): Promise<LoginResponse> {
  console.log("📡 Sending OTP request for:", formData.email);

  const result = await fetcher("api/users/request-otp/", {
    method: "POST",
    body: formData,
  });

  console.log("📋 Login result:", result);

  return {
    ok: result.ok,
    message:
      result.message ||
      (result.ok ? "OTP sent successfully" : "OTP request failed"),
    errors: result.errors,
    status: result.status,
  };
}