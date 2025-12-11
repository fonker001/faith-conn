import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { access, refresh } = await request.json();

    if (!access || !refresh) {
      return NextResponse.json(
        { ok: false, message: "Missing tokens" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const cookieSettings = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      path: "/",
    };

    // Save only tokens
    cookieStore.set("authToken", access, cookieSettings);
    cookieStore.set("refreshToken", refresh, cookieSettings);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Error setting cookies:", error);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
