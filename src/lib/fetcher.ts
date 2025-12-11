// lib/fetcher.ts

const getBaseUrl = () => {
  // If running on the server → use DJANGO_API_URL
  if (typeof window === "undefined") {
    return process.env.DJANGO_API_URL; 
  }

  // If running in the browser → use NEXT_PUBLIC_API_URL
  return process.env.NEXT_PUBLIC_API_URL;
};

export const fetcher = async (endpoint: string, options: any = {}) => {
  const BASE_URL = getBaseUrl();

  if (!BASE_URL) {
    console.error("Missing BASE_URL. Check your environment variables.");
    throw new Error("Missing BASE_URL");
  }

  const url = `${BASE_URL}/${endpoint.replace(/^\//, "")}`;

  console.log("Calling Django API:", url);
  console.log("Request data:", options.body);

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  console.log("Django API response:", {
    status: response.status,
    ok: response.ok,
    data,
  });

  return {
    ok: response.ok,
    status: response.status,
    ...data,
  };
};
