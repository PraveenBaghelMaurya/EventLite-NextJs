import ProtectedRoute from "@/services/Middleware/ProtectedRoute";

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ORGANIZER","ADMIN"]}>
      {children}
    </ProtectedRoute>
  );
}
