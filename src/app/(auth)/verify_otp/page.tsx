"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthForm } from "@/components/AuthForm";
import { verifyOtp } from "@/actions/auth/client/useVerifyOtp";
import { useAuthStore } from "@/store/authStore";
import { getProfile } from "@/services/profileService";

export default function OTPPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  async function handleSubmit(data: { otp: string }) {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      toast.error("Missing email. Please login again.");
      router.push("/login");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!email || !token) {
      toast.error("Missing email or token. Please login again.");
      router.push("/login");
      return;
    }

    // Save tokens
    localStorage.setItem("userEmail", email);
    localStorage.setItem("accessToken", token);

    // Verify OTP
    const res = await verifyOtp({ email, otp: data.otp });
    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    // Save tokens from response
    localStorage.setItem("accessToken", res.access!);
    localStorage.setItem("refreshToken", res.refresh!);

    // Fetch the full profile now
    const fullProfile = await getProfile();

    // Set full profile in the store
    setUser(fullProfile);

    toast.success("OTP verified successfully!");
    router.push("/member/home");
  }


  return (
    <section className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/31479127/pexels-photo-31479127.jpeg"
          alt="St. Francis of Assisi Ruiru Parish"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-end p-12 h-full text-white">
          <Link href="/">
            <p className="text-xl tracking-widest text-gray-300 mb-2">Faith Connect</p>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-gray-200">Sign in to continue your spiritual journey</p>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <AuthForm type="otp" onSubmit={handleSubmit} submitLabel="Verify" />
        </div>
      </div>
    </section>
  );
}
