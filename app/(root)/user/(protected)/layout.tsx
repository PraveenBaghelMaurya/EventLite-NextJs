import ProtectedRoute from "@/services/Middleware/ProtectedRoute";

export default function UserProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["USER"]}>
      {children}
    </ProtectedRoute>
  );
}
