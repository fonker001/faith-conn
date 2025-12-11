import Footer from "@/components/Footer";
import Navbar from "@/components/landing_features/Navbar";

// app/(landing)/layout.tsx
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
