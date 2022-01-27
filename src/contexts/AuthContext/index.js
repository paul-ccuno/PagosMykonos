import { createContext, useState } from "react";
import apiMykonos from "services/apiMykonos";

const AuthContext = createContext({
  user: null,
  token: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signIn = async ({ user, password }) => {
    const data = { user, password };
    const res = await apiMykonos.auth.signIn({ data });
    if (!res.success) {
      console.error("Error", res);
      return;
    }
    localStorage.setItem("pagos_mykonos_user", res.data.user);
    localStorage.setItem("pagos_mykonos_token", res.data.token);
    setUser(res.data.user);
    setToken(res.data.token);
  };

  const signOut = () => {
    localStorage.removeItem("pagos_mykonos_user");
    localStorage.removeItem("pagos_mykonos_token");
    setUser(null);
    setToken(null);
  };

  const value = { user, token, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
