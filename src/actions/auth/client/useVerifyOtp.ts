"use client";

//import { toast } from "sonner";
import api from "@/lib/axiosClient";
import axios from "axios";

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  ok: boolean;
  message: string;
  access?: string;
  refresh?: string;
  errors?: Record<string, string[]> | null;
}

export async function verifyOtp({ email, otp }: VerifyOtpPayload): Promise<VerifyOtpResponse> {
  console.log("Sending OTP verification:", { email, otp });

  try {
    const res = await api.post("/api/users/verify-otp/", { email, otp });
    console.log("OTP response:", res.data);
  
    const { access, refresh, message } = res.data;
    
    if (!access || !refresh) {
      return { ok: false, message: "Missing tokens in response." };
    }

    // Save tokens in localStorage
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("userEmail", email);

    return { ok: true, message, access, refresh };
  } catch (error: unknown) {
    console.error("Otp Axios error")
    let message = "OTP verification failed";
    let errors: Record<string, string[]> | null = null;

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      errors = data?.errors || null;
      if (data?.non_field_errors) message = data.non_field_errors[0];
      else message = data?.message || message;
    } else if (error instanceof Error) message = error.message;

    console.error("❌ OTP Axios error:", error);
    return { ok: false, message, errors };
  }
}

