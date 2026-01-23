import ProtectedRoute from "@/services/Middleware/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      {children}
    </ProtectedRoute>
  );
}
