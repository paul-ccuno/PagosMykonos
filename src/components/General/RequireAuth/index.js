import AuthContext from "contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const localUser = localStorage.getItem("pagos_mykonos_user");
  const localToken = localStorage.getItem("pagos_mykonos_token");

  if (!user || !token || !localUser || !localToken) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
