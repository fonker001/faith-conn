"use client";

import React from "react";
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";
import Image from "next/image";
import { registerUser } from "@/actions/auth/server/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignupValues } from "@/schema/schema";

export default function SignupPage() {
  const router = useRouter();
  async function handleSubmit(values: SignupValues) {
    const res = await registerUser(values);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    // Redirect to Login Page after successful registration
    router.push("/login");
  }

  return (
    <section className="flex min-h-screen ">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image using next/image */}
        <Image
          src="https://images.pexels.com/photos/31479127/pexels-photo-31479127.jpeg"
          alt="St. Francis of Assisi Ruiru Parish"
          fill
          className="object-cover"
          priority
          unoptimized
        />

        {/* Simple Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Subtle Grid Pattern */}
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

        {/* Content on top of the image */}
        <div className="relative z-10 flex flex-col justify-end p-12 h-full text-white">
          {/* Website Title */}
          <Link href="/">
            <p className="text-xl tracking-widest text-gray-300 mb-2">
              Faith Connect
            </p>
          </Link>

          {/* Page Heading */}
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>

          {/* Subtitle / Description */}
          <p className="text-lg text-gray-200">
            Sign Up to continue your spiritual journey
          </p>
        </div>
      </div>

      {/* Right Side - Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <AuthForm
            type="signup"
            onSubmit={handleSubmit}
            submitLabel="register"
          />
        </div>
      </div>
    </section>
  );
}
