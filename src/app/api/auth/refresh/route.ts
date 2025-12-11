import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refreshToken")?.value;

  if (!refresh) {
    return NextResponse.json(
      { ok: false, message: "No refresh token" },
      { status: 401 }
    );
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${backendUrl}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      cookieStore.delete("authToken");
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { ok: false, message: "Refresh failed" },
        { status: 401 }
      );
    }

    const data = await res.json();
    const newAccess = data.access;

    // Update the cookie with new access token
    cookieStore.set("authToken", newAccess, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error refreshing token:", err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
