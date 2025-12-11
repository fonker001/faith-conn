import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProviders from "@/lib/queryProviders";

export const metadata = {
  title: "Faith Connect",
  description: "A platform to connect people of faith.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased">
        <QueryProviders>{children}</QueryProviders>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
