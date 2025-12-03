import { Navigate } from "react-router-dom";
import pb from "../pocketbase";

export default function RequireAuth({ children }) {
  if (!pb.authStore.isValid) {
    return <Navigate to="/login" replace />;
  }
  return children;
}