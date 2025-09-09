import { createContext, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(authService.getAccessToken());

  const login = (t, exp) => {
    authService.saveToken(t, exp);
    setToken(t);
  };

  const logout = () => {
    authService.clear();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };