import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children }) {
  const { isSignedIn } = useAuth();
  const opticaId = localStorage.getItem("opticaId");

  if (isSignedIn) {
    // Usuario logueado: verificamos si tiene opticaId
    return opticaId ? (
      <Navigate to="/app/dashboard" replace />
    ) : (
      <Navigate to="/app/organizacion" replace />
    );
  }

  return children;
}
