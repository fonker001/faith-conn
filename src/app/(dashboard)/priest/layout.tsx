// app/(landing)/layout.tsx
export default function PriestDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}
