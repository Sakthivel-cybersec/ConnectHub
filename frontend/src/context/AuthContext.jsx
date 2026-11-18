import { createContext, useContext, useState } from "react";
import { hasPermission as checkPermission } from "../utils/accessControl";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("connecthub-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("connecthub-user");
      return null;
    }
  });

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("connecthub-user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("connecthub-user");
  };

  const isAuthenticated = Boolean(currentUser);

  const checkUserPermission = (permission) => {
    if (!currentUser) return false;

    return checkPermission(currentUser.role, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        logout,
        hasPermission: checkUserPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
