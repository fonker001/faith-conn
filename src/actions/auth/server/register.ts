"use server";

import { SignupValues } from "@/schema/schema";
import { fetcher } from "@/lib/fetcher";

interface RegisterResponse {
  ok: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
  status?: number;
}

export async function registerUser(
  formData: SignupValues
): Promise<RegisterResponse> {
  console.log("📡 Registering user with data:", formData);

  const result = await fetcher("api/users/register/", {
    method: "POST",
    body: formData,
  });

  console.log("📋 Register result:", result);

  return {
    ok: result.ok,
    message:
      result.message ||
      (result.ok ? "User registered successfully" : "Registration failed"),
    errors: result.errors,
    status: result.status,
  };
}