"use client";

import type React from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  loginSchema,
  LoginValues,
  otpSchema,
  OtpValues,
  signupSchema,
  SignupValues,
} from "@/schema/schema";
import Link from "next/link";

// --- Branch list ---
const outstations = [
  { id: 1, name: "St Charles" },
  { id: 2, name: "St Francis" },
  { id: 3, name: "St Andrew" },
  { id: 4, name: "St Monica" },
  { id: 5, name: "St Gabriel" },
];

// Interface for Props
type AuthType = "login" | "signup" | "otp";

type AuthValues<T extends AuthType> = T extends "login"
  ? LoginValues
  : T extends "signup"
  ? SignupValues
  : OtpValues;

interface AuthFormProps<T extends AuthType> {
  type: T;
  onSubmit: (values: AuthValues<T>) => Promise<void> | void;
  submitLabel?: string;
}

// Helper Function: Returns form schema & default values per type
function getFormConfig(type: "login" | "signup" | "otp") {
  switch (type) {
    case "login":
      return {
        schema: loginSchema,
        defaultValues: { email: "", branch: "" },
      } as const;
    case "signup":
      return {
        schema: signupSchema,
        defaultValues: {
          email: "",
          outstation: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          // dateOfBirth: "",
          address: "",
        },
      } as const;
    case "otp":
      return {
        schema: otpSchema,
        defaultValues: { otp: "" },
      } as const;
  }
}

// Main AuthForm Component
export function AuthForm<T extends AuthType>({
  type,
  onSubmit,
  submitLabel,
}: AuthFormProps<T>) {
  // Load schema & default values based on form type
  const config = getFormConfig(type);

  // Handle pending transitions (useful for async form submission)
  const [isPending, startTransition] = useTransition();

  // Initialize react-hook-form with Zod validation
  const form = useForm<z.infer<typeof config.schema>>({
    resolver: zodResolver(config.schema),
    defaultValues: config.defaultValues,
  });

  // Render Form Layout
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-[#D4AF37]/20 shadow-xl text-[#0D090A]">
      {/* ---------- Header ---------- */}
      <CardHeader className="text-center sm:text-left">
        <CardTitle className="text-3xl font-bold mb-2">
          {type === "signup"
            ? "Sign Up"
            : type === "otp"
            ? "Verify OTP"
            : "Sign In"}
        </CardTitle>

        <CardDescription className="text-sm sm:text-base">
          {type === "signup"
            ? "Create your account"
            : type === "otp"
            ? "Enter the one-time password sent to your email"
            : "Enter your credentials to access your account"}
        </CardDescription>
      </CardHeader>

      {/* ---------- Form Content ---------- */}
      <CardContent className="px-4 sm:px-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) =>
              startTransition(() => onSubmit(values as AuthValues<T>))
            )}
            className="space-y-4 sm:space-y-6"
          >
            {/* --- Signup Fields --- */}
            {type === "signup" && (
              <>
                {/* --- First & Last Name --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                            disabled={isPending}
                            className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                            disabled={isPending}
                            className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* --- Phone & Date of Birth --- */}
                <div>
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+2547********"
                            {...field}
                            disabled={isPending}
                            className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Date of Birth */}
                  {/* <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={isPending}
                            className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  /> */}
                </div>

                {/* --- Address --- */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          disabled={isPending}
                          className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* --- Branch Dropdown --- */}
                <FormField
                  control={form.control}
                  name="outstation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Your Outstation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-10 sm:h-11 border border-gray-200 rounded-md focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 text-sm sm:text-base">
                            <SelectValue placeholder="Select your outstation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white/95 backdrop-blur-md border-gray-200 shadow-lg">
                          {outstations.map((station) => (
                            <SelectItem
                              key={station.id}
                              value={String(station.id)}
                            >
                              {station.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* ---  SHARED FIELDS (Login + Signup) --- */}
            {(type === "signup" || type === "login") && (
              <>
                {/* --- Email --- */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@gmail.com"
                          {...field}
                          disabled={isPending}
                          className="h-10 sm:h-11 border-gray-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 "
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* ---   OTP FIELD (for OTP verification only) --- */}
            {type === "otp" && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    {" "}
                    {/* Center the whole field */}
                    <FormLabel className="text-sm font-medium text-center">
                      OTP
                    </FormLabel>
                    <FormControl className="">
                      <InputOTP
                        maxLength={6}
                        {...field}
                        disabled={isPending}
                        className="flex justify-center mt-2" // Center the OTP groups
                      >
                        <InputOTPGroup>
                          {[0, 1, 2].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-10 w-10 sm:h-11 sm:w-11 text-center text-lg border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 text-[#D4AF37] mr-1.5 
                           transition-all duration-150"
                            />
                          ))}
                        </InputOTPGroup>

                        <InputOTPSeparator className="hidden md:flex" />

                        <InputOTPGroup>
                          {[3, 4, 5].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="h-10 w-10 sm:h-11 sm:w-11 text-center text-lg border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 text-[#D4AF37]  mr-1.5 
                           transition-all duration-150"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs text-center" />
                  </FormItem>
                )}
              />
            )}

            {/* --- Submit Button --- */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 sm:h-12 py-2 sm:py-3 bg-[#D4AF37] text-white transition-all duration-200 text-sm sm:text-base font-medium"
            >
              {submitLabel ?? "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* ---------- Footer: Login/Signup Navigation ---------- */}
      <CardFooter className="flex justify-center mt-4">
        {type === "login" ? (
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign_up"
              className="text-[#D4AF37] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        ) : type === "signup" ? (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#D4AF37] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
